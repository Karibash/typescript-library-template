import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import buble from '@rollup/plugin-buble';
import { terser } from 'rollup-plugin-terser';
import ttypescript from 'ttypescript'
import typescript from "rollup-plugin-typescript2";
import dts from 'rollup-plugin-dts';

import pkg from './package.json';

const banner = `/*!
  ${pkg.name}.js v${pkg.version}
  ${pkg.homepage}
  Released under the ${pkg.license} License.
*/`;

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        name: pkg.name,
        file: pkg.main,
        format: 'umd',
        banner,
      },
      {
        name: pkg.name,
        file: pkg.main.replace('.js', '.min.js'),
        format: 'umd',
        plugins: [
          terser(),
        ],
      },
    ],
    external: [...Object.keys(pkg.devDependencies || {})],
    plugins: [
      resolve(),
      typescript({
        typescript: ttypescript,
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          compilerOptions: {
            declarationDir: 'out/.dts',
          },
        },
      }),
      commonjs({
        extensions: ['.ts', '.js'],
      }),
      buble(),
    ],
  },
  {
    input: 'out/.dts/index.d.ts',
    plugins: [
      dts(),
    ],
    output: {
      file: pkg.main.replace('.js', '.d.ts'),
      format: 'umd',
    },
  },
];
