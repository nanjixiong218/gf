const sh = require('shelljs')
const child_process = require('child_process')
const parseGit = require('parse-git-config');
const gitRev = require('git-rev-sync')
sh.config.fatal = true
sh.config.verbose = true
class GF {
  constructor() {

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
  }
  init() {
    // console.log(sh.exec('git flow init')) // TODO: bug for shelljs: https://github.com/shelljs/shelljs/issues/424
    child_process.execSync('git flow init', {stdio: 'inherit'})
  }
  develop(name) {
    sh.exec(`git flow develop start ${name}`)
  }
  feature(name) {
    sh.exec(`git flow feature start ${name}`)
  }
  release() {
    // TODO: 添加版本号校验, 不需要name, 版本号来自于pkg
    const version = pkg.version 
    sh.exec(`git flow release start ${version}`)
  }
  hotfix(name) {
    sh.exec(`git flow hotfix start ${name}`)  
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