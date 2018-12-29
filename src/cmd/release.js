const sh = require('shelljs')
const child_process = require('child_process')
const gitRev = require('git-rev-sync')

module.exports = function(program) {
  // TODO: 添加版本号校验, 不需要name, 版本号来自于pkg
  sh.exec(`git flow release start ${this.version}`)
}