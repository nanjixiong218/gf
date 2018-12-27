const sh = require('shelljs')
const child_process = require('child_process')
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
  release(name) {
    sh.exec(`git flow release start ${name}`)
  }
  hotfix(name) {
    sh.exec(`git flow hotfix start ${name}`)  
  }
}

module.exports = new GF()