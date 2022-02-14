#!/usr/bin/env node
const prompts = require('prompts');
const minimist = require('minimist');
const fs = require('fs');
const path = require('path');
const which = require('which');
const figlet = require('figlet');
const {
  yellow,
  green,
  cyan,
  blue,
  magenta,
  lightRed,
  red,
  reset
} = require('kolorist');

const argv = minimist(process.argv.slice(2), { string: ['_'] });

const cwd = process.cwd();

function success(message) {
  console.error(green(message));
}
const templates = [{
  name: 'react',
  display: 'JavaScript',
  color: blue
}, {
  name: 'react-ts',
  display: 'TypeScript',
  color: lightRed
}];

async function init() {
  let projectDir = argv._[0]; // 支持npm init / yarn create方式创建项目

  const defaultProjectName = !projectDir ? 'doves-project' : projectDir;

  let result = {};

  try {
    result = await prompts(
      [
        {
          type: projectDir ? null : 'text',
          name: 'projectName',
          message: reset('Project name:'),
          initial: defaultProjectName,
          onState: (state) => {
            return (projectDir = state.value.trim() || defaultProjectName)
          }
        },
        {
          type: () =>
            !fs.existsSync(projectDir) || isEmpty(projectDir) ? null : 'confirm',
          name: 'overwrite',
          message: () => `当前目录${red(projectDir)}已经存在，是否覆盖并且继续创建`
        },
        {
          type: (_, { overwrite } = {}) => {
            if (overwrite === false) {
              throw new Error(red('✖') + ' Operation cancelled')
            }
            return null
          },
          name: 'overwriteChecker'
        },
        {
          type: () => (isValidPackageName(projectDir) ? null : 'text'),
          name: 'packageName',
          message: reset('Package name:'),
          initial: () => toValidPackageName(projectDir),
          validate: (dir) =>
            isValidPackageName(dir) || 'Invalid package.json name'
        },
        {
          type: 'select',
          name: 'template',
          message: reset('Select a template:'),
          choices: templates.map((template) => {
            const templateColor = template.color
            return {
              title: templateColor(template.name),
              value: template
            }
          })
        },
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled')
        }
      }
    )
  } catch (err) {
    console.log(err.message)
    return;
  }
  const {projectName, overwrite, template, packageName} = result;
  // 准备创建项目
  // 1. 获取项目目录
  const root = path.join(cwd, projectDir); // 项目根目录

  // 2. 判断是否覆盖
  if (overwrite) {
    // 递归清空当前目录下面的文件
    emptyDir(root);
  } else if(!fs.existsSync(root)) {
    fs.mkdirSync(root)
  }
  // 3. 将模版写入到root中
  const write = (file, content) => {
    let targetPath;
    if(file.startsWith('_')) {
      targetPath = path.join(root, file.replace(/^_/, '.'))
    } else {
      targetPath = path.join(root, file);
    }
    let src = path.join(templateDir, file);
    if (content) {
      fs.writeFileSync(targetPath, content)
    } else {
      copy(src, targetPath);
    }
  }

  console.log(`\nScaffolding project in ${cyan(root)}...`)

  let templateDir = path.join(__dirname, `template/${template.name}`)

  const files = fs.readdirSync(templateDir);
  
  for (const file of files.filter((f) => f !== 'package.json')) {
    write(file)
  }

  const pkg = require(path.join(templateDir, `package.json`))

  pkg.name = packageName || projectDir

  write('package.json', JSON.stringify(pkg, null, 2))

  console.log(`\nDone. Now run:\n`)

  process.chdir(root);
  function printSuccess() {
    console.log();
    console.log(green(figlet.textSync('doves', {
      horizontalLayout: 'full',
    })))
    console.log();
    success(`
  cd ${root}
  npm start
    `)
  }
  await install(printSuccess);
  console.log();
}


function copy(src, dest) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    fs.copyFileSync(src, dest)
  }
}

function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}


function emptyDir (root) {
  if(!fs.existsSync(root)) {
    return;
  }
  for (const file of fs.readdirSync(root)) {
    const abs = path.resolve(root, file); // 获取绝对路径
    // Node v14.14.0 can use rmSync and no recursion
    if (fs.lstatSync(abs).isDirectory()) {
      emptyDir(abs)
      fs.rmdirSync(abs)
    } else {
      fs.unlinkSync(abs)
    }
  }
}

// 校验文件名是否合法
function isValidPackageName(projectName) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
    projectName
  )
}

function toValidPackageName(projectName) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z0-9-~]+/g, '-')
}

function isEmpty(path) {
  return fs.readdirSync(path).length === 0
}

function findNpm() {
  var npms = process.platform === 'win32' ? ['pnpm.cmd', 'yarn.cmd', 'cnpm.cmd','npm.cmd'] : ['pnpm', 'yarn', 'cnpm', 'npm'];
  for (var i = 0; i < npms.length; i++) {
    try {
      which.sync(npms[i]);
      console.log('use : ' + npms[i]);
      console.log();
      console.log(`${npms[i]} install`);
      return npms[i];
    } catch (e) {
    }
  }
  throw new Error('please install npm');
}

function runCmd(cmd, args, fn) {
  args = args || [];
  var runner = require('child_process').spawn(cmd, args, {
    stdio: "inherit"
  });
  runner.on('close', function (code) {
    if (fn) {
      fn(code);
    }
  });
}
// 添加依赖
const npmInstallMap = {
  'pnpm': 'install',
  'cnpm': 'install',
  'npm': 'install',
  'tnpm': 'install',
  'yarn': 'add',
}
function install (done) {
  const npm = findNpm();
  runCmd(which.sync('git'), ['init'], function () {
    runCmd(which.sync(npm), ['install'], function () {
      runCmd(which.sync(npm), [npmInstallMap[npm], 'doves-cli', '--save'], function () {
        done && done();
      });
    });
  });
};
init().catch(err => {
  console.log(err);
}) 

