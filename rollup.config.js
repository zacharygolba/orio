import * as path from 'path'

import babel from 'rollup-plugin-babel'
import cleanup from 'rollup-plugin-cleanup'
import resolve from 'rollup-plugin-node-resolve'

export default {
  dest: path.join(__dirname, 'dist', 'index.js'),
  entry: path.join(__dirname, 'src', 'index.js'),
  format: 'cjs',
  plugins: [
    resolve(),
    babel(),
    cleanup({
      comments: 'none',
    }),
  ],
  preferConst: true,
}
