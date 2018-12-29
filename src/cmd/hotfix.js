const sh = require('shelljs')
const child_process = require('child_process')
const gitRev = require('git-rev-sync')

module.exports = function(program, baseInfo) {
  // 这里是要打tag的，所有patch也需要有规则
  const timestamp = new Date().getTime()
  sh.exec(`git flow hotfix start ${baseInfo.version}-patch-${timestamp}`)  
}