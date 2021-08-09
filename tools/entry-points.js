const path = require('path');

const entryPoints = [
  [],
  ['core'],
  ['module'],
  ['utilities'],
];

const entryPointPaths = entryPoints.map(entryPoint => path.join(...entryPoint));

module.exports = {
  entryPoints,
  entryPointPaths,
};
