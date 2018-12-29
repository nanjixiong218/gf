const fsp  = require('fs-promise')

const pkg = require('./package.json')

pkg.version = '10000'
const st = JSON.stringify(pkg, null, 2)
fsp.writeFile('./package.json', st, 'utf-8')