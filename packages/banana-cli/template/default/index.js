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
    this.description = project.description;
    this.typescript = project.typescript;

    const styleExtMap = { sass: 'sass', less: 'less', stylus: 'stylus', none: 'css' };
    this.styleExt = styleExtMap[project.css] || 'css';

    const store = memFs.create();
    this.fs = editor.create(store);
  }

  resolve() {
    fs.ensureDirSync(this.projectPath);
    fs.ensureDirSync(this.sourceDir);
    fs.ensureDirSync(this.configDir);
    fs.ensureDirSync(path.join(this.sourceDir, 'path'));
    this.writeTpl(
      this.template,
      'indexhtml',
      {
        name: this.name,
        description: this.description,
        css: this.styleExt,
        template: this.template,
        typescript: this.typescript,
        version: this.version,
        title: '🍌 Banana-cli'
      },
      path.join(this.sourceDir, 'index.html')
    );
    this.fs.commit(() => this.commit());
  }

  commit() {
    console.log();
    console.log(`${chalk.green('✔ ')} ${chalk.grey(`创建文件: ${this.name}/src/index.html`)}`);
  }
}

module.exports = TplResolve;
