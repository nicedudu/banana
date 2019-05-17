const path = require('path');

const resolveTpl = project => {
  const TplResolve = require(path.join(__dirname, project.template));
  const tplResolve = new TplResolve(project);
  tplResolve.resolve();
};

class Template {
  writeTpl(template, source, data, dest) {
    this.fs.copyTpl(path.join(__dirname, template, source), dest, data, data);
  }
}

module.exports = {
  resolveTpl,
  Template
};
