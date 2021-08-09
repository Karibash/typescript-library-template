const fs = require('fs');
const path = require('path');

const { entryPoints } = require('./entry-points');
const packageJson = require('../package.json');

const distRoot = `${__dirname}/../dist`;
entryPoints.forEach(dirs => {
  if (!dirs.length) return;
  fs.writeFileSync(
    path.join(distRoot, ...dirs, 'package.json'),
    JSON.stringify({
      name: path.posix.join(packageJson.name, ...dirs),
      main: `index.cjs.js`,
      module: 'index.js',
      types: 'index.d.ts',
    }, null, 2) + "\n",
  );
});
