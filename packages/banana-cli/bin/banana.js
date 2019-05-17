const program = require('commander');
const { welcome, version } = require('../src/util');

welcome();

program
  .version(version())
  .usage('<command> [options]')
  .command('init [projectName]', 'Init a project with default templete')
  .command('build', 'Build a project with options')
  .command('update', 'Update packages of banana')
  .command('info', 'Diagnostics Banana env info')
  .command('doctor', 'Diagnose banana project')
  .parse(process.argv);
