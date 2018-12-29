const sh = require('shelljs')

module.exports = function(program, baseInfo) {
  // TODO: 添加版本号校验, 不需要name, 版本号来自于pkg
  sh.exec(`git flow release start ${baseInfo.version}`)
  sh.exec(`git push -u origin release/${baseInfo.version}`)
}