const program = require('commander');
const { CliInit } = require('../dist');
const { version } = require('../src/util');
const { resolveTpl } = require('../template');

program
  .option('--name <name>', '项目名称')
  .option('--description [description]', '项目介绍')
  .option('--css [css]', 'CSS预处理器(sass/less/stylus/none)')
  .option('--template [template]', '项目模板(default/ejs)')
  .option('--typescript', '使用Typescript')
  .action(({ name, description, css, template, typescript }) => {
    name = program.args[0] || name;
    const cliInit = new CliInit({ name, description, css, template, typescript, version: version() });
    cliInit
      .create()
      .then(result => resolveTpl(result))
      .catch(err => console.log(err));
  })
  .parse(process.argv);
