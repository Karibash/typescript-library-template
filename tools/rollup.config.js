import resolve from '@rollup/plugin-node-resolve';
import path from 'path';
import { terser } from 'rollup-plugin-terser';

const { entryPoints, entryPointPaths } = require('./entry-points');
const packageJson = require('../package.json');

const toRelativePathFromDist = (id, parentId) => {
  const distRoot = path.resolve(__dirname, '../dist');
  if (path.isAbsolute(id)) {
    return path.relative(distRoot, id);
  }
  return path.relative(distRoot, path.resolve(parentId, '../', id));
};

const isExternal = (id, parentId) => {
  const relativePath = toRelativePathFromDist(id, parentId);
  return entryPointPaths.includes(relativePath);
};

const prepareBundle = dirs => {
  const dir = path.join('./dist', ...dirs);
  return {
    input: `${dir}/index.js`,
    external: isExternal,
    output: {
      file: `${dir}/index.cjs.js`,
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
      externalLiveBindings: false,
    },
    plugins: [
      resolve(),
    ],
  };
};

export default [
  ...entryPoints.map(prepareBundle),
  {
    input: './dist/index.js',
    external: [...Object.keys(packageJson.devDependencies || {})],
    output: [
      {
        name: packageJson.name,
        file: `./dist/bundle.js`,
        format: 'umd',
        sourcemap: true,
        exports: 'named',
        externalLiveBindings: false,
      },
      {
        name: packageJson.name,
        file: `./dist/bundle.min.js`,
        format: 'umd',
        sourcemap: true,
        exports: 'named',
        externalLiveBindings: false,
        plugins: [
          terser(),
        ],
      },
    ],
    plugins: [
      resolve(),
    ],
  },
];
