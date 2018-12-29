const sh = require('shelljs')

const pkg = require('./package.json')
const fsp = require('fs-promise')

sh.config.fatal = true
sh.config.verbose = true
class GF {
  constructor() {
    this.version = pkg.version
  }
  async boot(program) {
    const cmdPathBase = './src/cmd'
    const dirs = await fsp.readdir(cmdPathBase)
    const cmd = null
    for (const cmdFile of dirs) {
      const cmdName = cmdFile.split('.')[0]
      if(cmdName in program) {
        const cmd = require(`${cmdPathBase}/${cmdFile}`)
        cmd(program)
        return
      }
    }
    if(cmd === null) {
      console.warn('cmd not support')
    }
  }
}

module.exports = new GF()