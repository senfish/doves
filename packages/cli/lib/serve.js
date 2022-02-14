const {
  yellow,
  green,
  cyan,
  blue,
  magenta,
  lightRed,
  red,
  reset,
  logo
} = require('./utils/logger');

const webpack = require('webpack');

const webpackDevServer = require('webpack-dev-server');

const {
  getServeWebpackConfig
} = require('./utils/webpack');

const cwd = process.cwd();

async function serve(program) {
  let options = program.opts();
  let webpackConfig = getServeWebpackConfig(cwd, options);
  logo();
  const compiler = webpack(webpackConfig);
  const server = new webpackDevServer(webpackConfig.devServer, compiler);
  server.start();
}

module.exports = serve;