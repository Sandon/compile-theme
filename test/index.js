/**
 * Created by Sandon on 2019-05-06.
 */
const path = require('path')
const {compileTheme} = require('../index.js')

compileTheme({
  repository: 'git@code.aliyun.com:sunyur_fe_code/fe-common.git',
  branch: 'dev_zhenlong_20190315',
  sassVariables: {
    '$--color-primary': '#007258',
    '$--color-guide': '#FBA637',
    '$--color-special': '#FFF4EF',
    '$--color-brand': '#2E9A79',
    '$--color-brand-hover': '#63B49B',
    '$--color-theme-fading-1': '#54A65F',
    '$--color-theme-fading-2': '#C3E0C7',
    '$--color-theme-fading-3': '#DBEBE8'
  },
  configFile: './theme/1.0/config.color.scss', // absolute or relative path
  src: './theme/1.0/theme.scss', // absolute or relative path
  target: path.join(__dirname, '../tmp/theme.css') // must be absolute path
})
