/**
 * Created by Sandon on 2019-03-12.
 */
const shell = require('shelljs')
const util = require('util')
const fs = require('fs')
const path = require('path')

const writeFile = util.promisify(fs.writeFile)

async function compileTheme (option) {
  // check git exist
  if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git')
    shell.exit(1)
    return false
  }

  // clone code and switch to target branch
  shell.cd('./tmp')
  if (shell.exec(`git clone ${option.repository} repo`).code !== 0) {
    shell.echo('Error: Git clone failed')
    shell.exit(1)
    return false
  }
  shell.cd('repo')
  if (shell.exec(`git checkout -b ${option.branch} origin/${option.branch}`).code !== 0) {
    shell.echo('Error: Git checkout failed')
    shell.exit(1)
    return false
  }

  // generate the config scss file
  const fileContent = Object.keys(option.sassVariables)
    .map((key) => {
      return `${key}: ${option.sassVariables[key]};`
    })
    .join('\n')
  await writeFile(option.configFile, fileContent, 'utf8')

  // build
  if (shell.exec(`node-sass ${option.src} ${option.target} --output-style compressed`).code !== 0) {
    shell.echo('build failed')
    shell.exit(1)
  }

  // remove repo
  shell.rm('-rf', path.join(__dirname, './tmp/repo'))
}

module.exports.compileTheme = compileTheme
