const sh = require('shelljs')
const child_process = require('child_process')

module.exports = function(program) {
  // console.log(sh.exec('git flow init')) // TODO: bug for shelljs: https://github.com/shelljs/shelljs/issues/424
  try{
    child_process.execSync('git flow init', {stdio: 'inherit'})
    sh.exec('git push -u origin master')
    sh.exec('git push -u origin develop')
  }catch(e) {
    console.error(e)
  }
}