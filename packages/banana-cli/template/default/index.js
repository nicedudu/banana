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
    this.pageDir = path.join(this.sourceDir, 'pages');
    this.configDir = path.join(this.projectPath, 'config');
    this.publicDir = path.join(this.sourceDir, 'public');
    this.sharedDir = path.join(this.sourceDir, 'shared');
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
    fs.ensureDirSync(this.pageDir);
    fs.ensureDirSync(this.configDir);
    fs.ensureDirSync(this.publicDir);
    fs.ensureDirSync(this.sharedDir);
    this.copy(null, 'logo.svg', path.join(this.publicDir, 'logo.svg'));
    this.writeTpl(this.template, 'indexhtml', path.join(this.pageDir, 'index', 'index.html'), {
      name: this.name,
      version: this.version,
      title: '🍌 Banana-cli'
    });
    this.writeTpl(this.template, 'headerhtml', path.join(this.sharedDir, 'header.html'), {
      name: this.name
    });
    this.writeTpl(this.template, 'footerhtml', path.join(this.sharedDir, 'footer.html'));
    this.writeTpl(this.template, 'scss', path.join(this.pageDir, 'index', `index.${this.styleExt}`));
    if (this.typescript) this.writeTpl(this.template, 'tsconfig', path.join(this.projectPath, 'tsconfig.json'));
    this.writeTpl(
      this.template,
      'indexjs',
      path.join(this.pageDir, 'index', `index.${this.typescript ? 'ts' : 'js'}`),
      {
        styleExt: this.styleExt
      }
    );
    this.writeTpl(this.template, 'pkg', path.join(this.projectPath, 'package.json'), {
      name: this.name,
      description: this.description,
      typescript: this.typescript,
      style: this.styleExt
    });
    this.writeTpl(this.template, 'gitignore', path.join(this.projectPath, '.gitignore'));
    this.writeTpl(this.template, 'eslintrc', path.join(this.projectPath, '.eslintrc'));
    this.writeTpl(this.template, 'eslintignore', path.join(this.projectPath, '.eslintignore'));
    this.writeTpl(this.template, 'babelrc', path.join(this.projectPath, '.babelrc'), {
      typescript: this.typescript
    });
    this.writeTpl(this.template, 'editorconfig', path.join(this.projectPath, '.editorconfig'));
    this.writeTpl(this.template, 'readme', path.join(this.projectPath, 'README.md'));
    this.writeTpl(this.template, 'webpackbase', path.join(this.projectPath, 'webpack.base.js'), {
      typescript: this.typescript,
      style: this.styleExt
    });
    this.writeTpl(this.template, 'webpackdev', path.join(this.projectPath, 'webpack.dev.js'));
    this.writeTpl(this.template, 'webpackprod', path.join(this.projectPath, 'webpack.prod.js'));
    this.fs.commit(() => this.commit());
  }

  commit() {
    console.log();
    console.log(`${chalk.green('✔ ')} ${chalk.grey(`创建文件: ${this.name}/src/pages/index.html`)}`);
    console.log(`${chalk.green('✔ ')} ${chalk.grey(`创建文件: ${this.name}/src/shared/header.html`)}`);
    console.log(`${chalk.green('✔ ')} ${chalk.grey(`创建文件: ${this.name}/src/shared/footer.html`)}`);
    console.log(`${chalk.green('✔ ')} ${chalk.grey(`创建文件: ${this.name}/src/pages/index.${this.styleExt}`)}`);
    console.log(
      `${chalk.green('✔ ')} ${chalk.grey(`创建文件: ${this.name}/src/pages/index.${this.typescript ? 'ts' : 'js'}`)}`
    );
    if (this.typescript) console.log(`${chalk.green('✔ ')} ${chalk.grey(`创建文件: ${this.name}/tsconfig.json`)}`);
    console.log(`${chalk.green('✔ ')} ${chalk.grey(`创建文件: ${this.name}/package.json`)}`);
    console.log(`${chalk.green('✔ ')} ${chalk.grey(`创建文件: ${this.name}/.gitignore`)}`);
    console.log(`${chalk.green('✔ ')} ${chalk.grey(`创建文件: ${this.name}/.eslintrc`)}`);
    console.log(`${chalk.green('✔ ')} ${chalk.grey(`创建文件: ${this.name}/.eslintignore`)}`);
    console.log(`${chalk.green('✔ ')} ${chalk.grey(`创建文件: ${this.name}/.babelrc`)}`);
    console.log(`${chalk.green('✔ ')} ${chalk.grey(`创建文件: ${this.name}/.editorconfig`)}`);
    console.log(`${chalk.green('✔ ')} ${chalk.grey(`创建文件: ${this.name}/README.md`)}`);
    console.log(`${chalk.green('✔ ')} ${chalk.grey(`创建文件: ${this.name}/webpack.base.js`)}`);
    console.log(`${chalk.green('✔ ')} ${chalk.grey(`创建文件: ${this.name}/webpack.dev.js`)}`);
    console.log(`${chalk.green('✔ ')} ${chalk.grey(`创建文件: ${this.name}/webpack.prod.js`)}`);
  }
}

module.exports = TplResolve;
