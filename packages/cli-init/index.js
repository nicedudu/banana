const chalk = require('chalk');
const inquirer = require('inquirer');

class CliInit {
  constructor(options) {
    this.project = { ...options, dir: process.cwd() };
    this.init();
  }

  init() {
    console.log(chalk.yellow(`Banana 即将创建一个新项目！`));
    console.log();
  }

  create() {
    return new Promise((resolve, reject) => {
      this.askQuestions()
        .then(answers => {
          this.project = { ...this.project, ...answers };
          resolve(this.project);
        })
        .catch(err => reject(err));
    });
  }

  askQuestions() {
    const questions = [];
    if (typeof this.project.name !== 'string') {
      questions.push({
        type: 'input',
        name: 'name',
        message: '请输入项目名称！',
        validate(input) {
          if (!input) {
            return '项目名不能为空';
          }
          return true;
        }
      });
    }

    if (typeof this.project.description !== 'string') {
      questions.push({
        type: 'input',
        name: 'description',
        message: '请输入项目介绍！'
      });
    }

    if (typeof this.project.css !== 'string') {
      questions.push({
        type: 'list',
        name: 'css',
        message: '请选择 CSS 预处理器（Sass/Less/Stylus）',
        choices: [
          { name: 'Sass', value: 'sass' },
          { name: 'Less', value: 'less' },
          { name: 'Stylus', value: 'stylus' },
          { name: '无', value: 'none' }
        ]
      });
    }

    if (typeof this.project.template !== 'string') {
      questions.push({
        type: 'list',
        name: 'template',
        message: '请选择 HTML 模板引擎',
        choices: [{ name: '默认模板', value: 'default' }, { name: 'ejs', value: 'ejs' }]
      });
    }

    if (typeof this.project.typescript !== 'boolean') {
      questions.push({
        type: 'confirm',
        name: 'typescript',
        message: '是否使用 Typescript ？'
      });
    }

    return inquirer.prompt(questions);
  }
}

module.exports = CliInit;
