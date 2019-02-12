const sh = require('shelljs')
const child_process = require('child_process')
const gitRev = require('git-rev-sync')

module.exports = function(program) {
  const name = program.feature
  sh.exec(`git flow feature start ${name}`)
  // TODO: 暂时不进行远程同步
  // sh.exec(`git push -u origin feature/${name}`)
}