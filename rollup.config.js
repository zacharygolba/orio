import * as path from 'path'

import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

const PACKAGES = path.join(__dirname, 'packages')

const configFor = (name, provides = name) => ({
  input: path.join(PACKAGES, name, 'src', 'index.js'),
  output: [
    {
      file: path.join(PACKAGES, name, 'dist', 'index.js'),
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: path.join(PACKAGES, name, 'dist', 'index.es.js'),
      format: 'es',
      sourcemap: true,
    },
    {
      file: path.join(PACKAGES, name, 'dist', 'index.iife.js'),
      format: 'iife',
      name: provides,
      sourcemap: true,
    },
  ],
  plugins: [json(), babel(), resolve()],
  preferConst: true,
})

export default [
  configFor('ouro-result', 'result'),
  configFor('ouro-traits', 'traits'),
  configFor('ouro-utils', 'utils'),
  configFor('ouro-core', 'ouro'),
]
