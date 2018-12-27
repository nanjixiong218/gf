#!/usr/bin/env node
const program = require('commander')
const pkg = require('../package.json')
const gf = require('../index.js')
program.version(pkg.version, '-v, --version')
.option('-i, --init', 'git flow init')
.option('-f, --feature <n>', 'git flow feature start')
.option('--finish', 'git flow xxx publish xx')
.option('-r, --release <n>', 'git flow release start')
.parse(process.argv)

gf.boot(program)

