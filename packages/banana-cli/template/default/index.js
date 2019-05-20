const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const memFs = require('mem-fs');
const editor = require('mem-fs-editor');
const { Template } = require('..');

class TplResolve extends Template {
  constructor(project) {
    super();

    this.name = project.name;
    this.template = project.template;
    this.projectPath = path.join(project.dir, this.name);
    this.sourceDir = path.join(this.projectPath, 'src');
    this.configDir = path.join(this.projectPath, 'config');
    this.publicDir = path.join(this.sourceDir, 'public');
    this.description = project.description;
    this.typescript = project.typescript;
    this.version = project.version;

    const styleExtMap = { sass: 'scss', less: 'less', stylus: 'styl', none: 'css' };
    this.styleExt = styleExtMap[project.css] || 'css';

    const store = memFs.create();
    this.fs = editor.create(store);
  }

  resolve() {
    fs.ensureDirSync(this.projectPath);
    fs.ensureDirSync(this.sourceDir);
    fs.ensureDirSync(this.configDir);
    fs.ensureDirSync(this.publicDir);
    this.copy(null, 'logo.svg', path.join(this.publicDir, 'logo.svg'));
    this.writeTpl(this.template, 'indexhtml', path.join(this.sourceDir, 'index.html'), {
      name: this.name,
      version: this.version,
      title: '🍌 Banana-cli'
    });
    this.writeTpl(this.template, 'scss', path.join(this.publicDir, `style.${this.styleExt}`));
    if (this.typescript) this.writeTpl(this.template, 'tsconfig', path.join(this.projectPath, 'tsconfig.json'));
    this.writeTpl(this.template, 'indexjs', path.join(this.sourceDir, `index.${this.typescript ? 'ts' : 'js'}`));
    this.writeTpl(this.template, 'pkg', path.join(this.projectPath, 'package.json'), {
      name: this.name,
      description: this.description
    });
    this.writeTpl(this.template, 'gitignore', path.join(this.projectPath, '.gitignore'));
    this.writeTpl(this.template, 'eslintrc', path.join(this.projectPath, '.eslintrc'));
    this.writeTpl(this.template, 'eslintignore', path.join(this.projectPath, '.eslintignore'));
    this.writeTpl(this.template, 'babelrc', path.join(this.projectPath, '.babelrc'));
    this.writeTpl(this.template, 'editorconfig', path.join(this.projectPath, '.editorconfig'));
    this.writeTpl(this.template, 'readme', path.join(this.projectPath, 'README.md'));
    this.fs.commit(() => this.commit());
  }

  commit() {
    console.log();
    console.log(`${chalk.green('✔ ')} ${chalk.grey(`创建文件: ${this.name}/src/index.html`)}`);
    console.log(`${chalk.green('✔ ')} ${chalk.grey(`创建文件: ${this.name}/src/public/style.${this.styleExt}`)}`);
    console.log(
      `${chalk.green('✔ ')} ${chalk.grey(`创建文件: ${this.name}/src/index.${this.typescript ? 'ts' : 'js'}`)}`
    );
    if (this.typescript) console.log(`${chalk.green('✔ ')} ${chalk.grey(`创建文件: ${this.name}/tsconfig.json`)}`);
    console.log(`${chalk.green('✔ ')} ${chalk.grey(`创建文件: ${this.name}/package.json`)}`);
    console.log(`${chalk.green('✔ ')} ${chalk.grey(`创建文件: ${this.name}/.gitignore`)}`);
    console.log(`${chalk.green('✔ ')} ${chalk.grey(`创建文件: ${this.name}/.eslintrc`)}`);
    console.log(`${chalk.green('✔ ')} ${chalk.grey(`创建文件: ${this.name}/.eslintignore`)}`);
    console.log(`${chalk.green('✔ ')} ${chalk.grey(`创建文件: ${this.name}/.babelrc`)}`);
    console.log(`${chalk.green('✔ ')} ${chalk.grey(`创建文件: ${this.name}/.editorconfig`)}`);
    console.log(`${chalk.green('✔ ')} ${chalk.grey(`创建文件: ${this.name}/README.md`)}`);
  }
}

module.exports = TplResolve;
