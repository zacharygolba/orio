import * as path from 'path'

import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: path.join(__dirname, 'src', 'index.js'),
  output: [
    {
      file: path.join(__dirname, 'dist', 'index.js'),
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: path.join(__dirname, 'dist', 'index.es.js'),
      format: 'es',
      sourcemap: true,
    },
    {
      file: path.join(__dirname, 'dist', 'index.iife.js'),
      format: 'iife',
      name: 'iter',
      sourcemap: true,
    },
  ],
  plugins: [json(), babel(), resolve()],
  preferConst: true,
}
