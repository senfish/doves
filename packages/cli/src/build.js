const {
  yellow,
  green,
  cyan,
  blue,
  magenta,
  lightRed,
  red,
  reset,
  bold,
  logo
} = require('./utils/logger');
const webpack = require('webpack');
const {getBuildWebpackConfig} = require('./utils/webpack');
const ora = require('ora');

const spinner = ora('Building Project ......');

const cwd = process.cwd();

async function build(program) {
  logo();

  spinner.start();

  let options = program.opts();

  let webpackConfig = getBuildWebpackConfig(cwd, options);

  const compiler = webpack(webpackConfig, (err, stats) => {
    if (err) {
        spinner.fail('Building Failed');
        // console.error(err.message)
        console.error(err.stack || err);
        return;
    }
    const info = stats.toJson();
    spinner.succeed(`webpack ${green(bold(info.version))} compiled ${green(bold('Successful!'))} in ${info.time} ms`)
    
    console.log('Build output: ' + green(info.outputPath));
  });
}

module.exports = build;
