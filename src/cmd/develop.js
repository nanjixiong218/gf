const sh = require('shelljs')
const child_process = require('child_process')
const gitRev = require('git-rev-sync')

module.exports = function(program) {
  // TODO: develop如何同步的问题
  sh.exec(`git flow develop start ${name}`)
}