const path = require('path');
const chalk = require('chalk');

function version() {
  return require(path.join(path.resolve(__dirname, '../../'), 'package.json')).version;
}

function welcome() {
  console.log(chalk.yellow.bold(`🍌 Banana v${version()}`));
  console.log();
}

module.exports = {
  version,
  welcome
};
