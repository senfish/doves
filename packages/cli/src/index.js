const program = require('commander');
const pkg = require('../package.json');

// dev
program
  .version(`${pkg.version}`, '-v, -V, --version', 'output the current version')
  .command('serve')
  .description('serve project')
  .option('-h, --host [host]', `[string] specify hostname`)
  .option('-p, --port <port>', `[number] specify port`)
  .option('--open, [open]', `open the browser`)
  .option('--copy, [copy]', 'copy URL to clipboard') // TODO
  .option('--hot [hot]', 'hot-module-replacement')
  .option('--mode <mode>', 'webpack mode')
  .option('--config <config>', `[string] webpack config file path`)
  .action((root, options) => {
    require('./serve')(options);
  });

// build
program
  .command('build')
  .option('--config <config>', `[string] webpack config file path`)
  .option('--output <dir>', `[string] output directory (default: dist)`)
  .option('--mode <mode>', 'Webpack mode')
  .option('--clean [clean]', 'Remove the last package file')
  .action((root, options) => {
    require('./build')(options);
  });

program.parse(process.argv);