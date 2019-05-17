const path = require('path');
const memFs = require('mem-fs');
const editor = require('mem-fs-editor');

exports.resolveTpl = project => {
  const template = require(path.join(__dirname, project.template));
  template.resolve(project);
};

exports.writeTpl = (template, source, data, dest, callback) => {
  const store = memFs.create();
  const fs = editor.create(store);
  fs.copyTpl(path.join(__dirname, template, source), dest, data, data);
  fs.commit(() => callback(data.name));
};
