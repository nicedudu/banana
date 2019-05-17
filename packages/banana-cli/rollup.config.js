import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';

export default {
  input: path.join(__dirname, 'src/index.js'),
  output: {
    file: path.join(__dirname, 'dist/index.js'),
    format: 'cjs'
  },
  // experimentalDynamicImport: true,
  plugins: [
    resolve({ preferBuiltins: false }),
    commonjs(),
    json(),
    babel({
      exclude: 'node_module/**',
      babelrc: false,
      presets: [['@babel/preset-env']]
    })
  ],
  external: ['commander', 'chalk', 'inquirer']
};
