const path = require('path');

const getPath = _path => {
  return path.join(__dirname, 'public', _path);
};

module.exports = {
  getPath: getPath
};
