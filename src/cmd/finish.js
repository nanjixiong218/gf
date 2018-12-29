const sh = require('shelljs')
const child_process = require('child_process')
const gitRev = require('git-rev-sync')

module.exports = function() {
  // TODO: 合法性校验
  const currentBranch = gitRev.branch()
  const typeName = currentBranch.split('/')[0]
  const customName = currentBranch.split('/')[1]
  child_process.execSync(`git flow ${typeName} finish ${customName}`, {stdio: 'inherit'})
}