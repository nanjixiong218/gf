const sh = require('shelljs')
const pkg = require('../../package.json')
const fsp = require('fs-promise')
const path = require('path')

const cwd = process.cwd()
module.exports = function(program, baseInfo) {
  // 这里是要打tag的，所有patch也需要有规则
  const timestamp = new Date().getTime()
  const patchVersion = `${baseInfo.version}-patch-${timestamp}`
  sh.exec(`git flow hotfix start ${patchVersion}`)
  // 修改 package.json 的 version: ${baseInfo.version}-patch-${timestamp} 
  pkg.version = patchVersion
  const pkgString = JSON.stringify(pkg, null, 2)
  fsp.writeFile(path.join(cwd, 'package.json'), pkgString, 'utf-8') 
}