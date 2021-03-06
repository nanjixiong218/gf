const sh = require('shelljs')
const child_process = require('child_process')
const gitRev = require('git-rev-sync')

module.exports = function(program, baseInfo) {
  // TODO: 合法性校验
  const currentBranch = gitRev.branch(baseInfo.cwd)
  const typeName = currentBranch.split('/')[0]
  const customName = currentBranch.split('/')[1]
  child_process.execSync(`git flow ${typeName} finish ${customName}`, {stdio: 'inherit'})

  if(typeName === 'release') { 

  }
  if(typeName === 'feature') {
    // sh.exec(`git push origin --delete ${currentBranch}`)
  }
  if(typeName === 'hotfix') { // hotfix 后切到 master
    sh.exec(`git push origin --delete ${currentBranch}`)
    sh.exec(`git checkout master`)
  }
}