const sh = require('shelljs')
const child_process = require('child_process')
const gitRev = require('git-rev-sync')
const pkg = require('./package.json')
sh.config.fatal = true
sh.config.verbose = true
class GF {
  constructor() {
    this.version = pkg.version
  }
  boot(program) {
    if(program.init) {
      this.init()
      return
    } 
    if(program.feature) {
      let featureName = program.feature
      this.feature(featureName)
    }
    if(program.finish) {
      this.finish()
    }
    if(program.release) {
      this.release()
    }
    if(program.hotfix) {
      this.hotfix()
    }
  }
  init() {
    // console.log(sh.exec('git flow init')) // TODO: bug for shelljs: https://github.com/shelljs/shelljs/issues/424
    child_process.execSync('git flow init', {stdio: 'inherit'})
  }
  develop(name) {
    // TODO: develop如何同步的问题
    sh.exec(`git flow develop start ${name}`)
  }
  feature(name) {
    sh.exec(`git flow feature start ${name}`)
  }
  release() {
    // TODO: 添加版本号校验, 不需要name, 版本号来自于pkg
    sh.exec(`git flow release start ${this.version}`)
  }
  hotfix() {
    // 这里是要打tag的，所有patch也需要有规则
    const timestamp = new Date().getTime()
    sh.exec(`git flow hotfix start ${this.version}-patch-${timestamp}`)  
  }
  finish() {
    // TODO: 合法性校验
    const currentBranch = gitRev.branch()
    const typeName = currentBranch.split('/')[0]
    const customName = currentBranch.split('/')[1]
    child_process.execSync(`git flow ${typeName} finish ${customName}`, {stdio: 'inherit'})
  }
}

module.exports = new GF()