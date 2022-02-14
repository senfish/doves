const fs = require('fs');
const path = require('path');
const {
  yellow,
  green,
  cyan,
  blue,
  magenta,
  lightRed,
  red,
  reset
} = require('./logger');

const getServeWebpackConfig = (cwd, options) => {
  // TODO 考虑给一个默认的webpack配置
  let webpackConfig = getOriginWebpackConfig(cwd, options);
  webpackConfig.devServer = webpackConfig.devServer || {};

  if (options.port) {
    webpackConfig.devServer.port = options.port;
  }

  if (options.host) {
    webpackConfig.devServer.port = options.host;
  }

  if (options.hot) {
    webpackConfig.devServer.hot = options.hot;
  }
  if (options.open) {
    webpackConfig.devServer.open = options.open;
  }

  if(options.mode) {
    if(!['development', 'production'].includes(options.mode)) {
      console.log(`the mode must be ${green('development')} or ${green('production')} but get ${red(options.mode)}`);
      process.exit(1);
    }
  
    webpackConfig.mode = options.mode;
  }

  if(options.copy) {
    // TODO
  }

  return webpackConfig;
}

const getOriginWebpackConfig = (cwd, options) => {
  let configUrl;
  let originConfig = {};
  if(options.config) {
    configUrl = path.join(cwd, options.config)
  } else {
    // TODO 支持各种webpack后缀文件 .webpackrc
    configUrl = path.join(cwd, 'webpack.config.js')
  }
  if(fs.existsSync(configUrl)){
    originConfig = require(configUrl);    
  } else {
    console.log(`The config file ${lightRed(configUrl)} is not found`);
    process.exit(1);
  }
  return originConfig
}
const getBuildWebpackConfig = (cwd, options) => {
  let webpackConfig = getOriginWebpackConfig(cwd, options);

  if(options.mode) {
    webpackConfig.mode = options.mode;
  }

  webpackConfig.output = webpackConfig.output || {};
  if (options.output) {
    webpackConfig.output.path = path.join(process.cwd(), options.output);
  }
  
  if (options.clean) {
    webpackConfig.output.clean = true;
  }
  return webpackConfig;
}

module.exports = {
  getServeWebpackConfig,
  getBuildWebpackConfig,
}
