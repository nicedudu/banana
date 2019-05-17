const path = require('path');

const resolveTpl = project => {
  const TplResolve = require(path.join(__dirname, project.template));
  const tplResolve = new TplResolve(project);
  tplResolve.resolve();
};

class Template {
  writeTpl(template, source, dest, data) {
    if (!data) data = this;
    console.log(data);
    this.fs.copyTpl(path.join(__dirname, template, source), dest, data);
  }

  copy(template, source, dest) {
    source = template ? path.join(__dirname, template, source) : path.join(__dirname, source);
    this.fs.copy(source, dest);
  }
}

module.exports = {
  resolveTpl,
  Template
};
