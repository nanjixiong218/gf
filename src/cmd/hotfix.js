const sh = require('shelljs')
const child_process = require('child_process')
const gitRev = require('git-rev-sync')
const pkg = require('../../package.json')
const fsp = require('fs-promise')
module.exports = function(program, baseInfo) {
  // 这里是要打tag的，所有patch也需要有规则
  const timestamp = new Date().getTime()
  const patchVersion = `${baseInfo.version}-patch-${timestamp}`
  sh.exec(`git flow hotfix start ${patchVersion}`)
  // 修改 package.json 的 version: ${baseInfo.version}-patch-${timestamp} 
  pkg.version = patchVersion
  const pkgString = JSON.stringify(pkg)
  console.log(pkgString)
  fsp.writeFile('../../package.json', pkgString, 'utf-8') 
}