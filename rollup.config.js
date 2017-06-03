import path from 'path'

import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

export default {
  dest: path.join(__dirname, 'dist', 'index.js'),
  entry: path.join(__dirname, 'src', 'index.js'),
  format: 'cjs',
  plugins: [
    resolve(),
    babel(),
  ],
  preferConst: /(?:[678]\.\d\.\d)$/.test(process.version),
}
