const sh = require('shelljs')
const pkg = require('../../package.json')
const fsp = require('fs-promise')
const path = require('path')

module.exports = function(program, baseInfo) {
  const timestamp = new Date().getTime()
  const patchVersion = `${baseInfo.version}-patch-${timestamp}`
  sh.exec(`git flow hotfix start ${patchVersion}`)
  sh.exec(`git push -u origin hotfix/${patchVersion}`)
  // 修改 package.json 的 version: patchVersion
  pkg.version = patchVersion
  const pkgString = JSON.stringify(pkg, null, 2)
  fsp.writeFile(path.join(baseInfo.cwd, 'package.json'), pkgString, 'utf-8') 
}