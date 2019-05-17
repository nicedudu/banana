const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const { writeTpl } = require('..');

exports.resolve = project => {
  const { name, description, css, template, typescript, dir, version } = project;

  const projectPath = path.join(dir, name);
  const sourceDir = path.join(projectPath, 'src');
  const configDir = path.join(projectPath, 'config');
  const styleExtMap = { sass: 'sass', less: 'less', stylus: 'stylus', none: 'css' };
  const styleExt = styleExtMap[css] || 'css';

  fs.ensureDirSync(projectPath);
  fs.ensureDirSync(sourceDir);
  fs.ensureDirSync(configDir);
  fs.ensureDirSync(path.join(sourceDir, 'path'));
  writeTpl(
    template,
    'indexhtml',
    { name, description, css: styleExt, template, typescript, version, title: '🍌 Banana-cli' },
    path.join(sourceDir, 'index.html'),
    commit
  );
};

function commit(name) {
  console.log();
  console.log(`${chalk.green('✔ ')} ${chalk.grey(`创建文件: ${name}/src/index.html`)}`);
}
