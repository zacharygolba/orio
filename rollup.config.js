// @flow

import * as path from 'path'

import json from 'rollup-plugin-json'
import gzip from 'rollup-plugin-gzip'
import babel from 'rollup-plugin-babel'
import minify from 'rollup-plugin-babel-minify'
import resolve from 'rollup-plugin-node-resolve'
import license from 'rollup-plugin-license'
import { stripIndents } from 'common-tags'

import { version } from './lerna.json'

const PACKAGES = path.join(__dirname, 'packages')

const configFor = (name, provides = name, minified = false) => {
  let ext = 'js'
  const plugins = [
    json(),
    babel(),
    resolve(),
    license({
      banner: stripIndents`
        ${name} v${version} | (c) ${new Date().getFullYear()} Zachary Golba
        Released under the MIT License.
      `,
    }),
  ]

  if (minified) {
    ext = 'min.js'
    plugins.unshift(minify(), gzip())
  }

  return {
    input: path.join(PACKAGES, name, 'src', 'index.js'),
    output: [
      {
        file: path.join(PACKAGES, name, 'dist', `index.es.${ext}`),
        format: 'es',
        sourcemap: true,
      },
      {
        file: path.join(PACKAGES, name, 'dist', `index.${ext}`),
        format: 'umd',
        name: provides,
        sourcemap: true,
      },
    ],
    plugins,
    preferConst: true,
  }
}

export default [
  configFor('orio-result', 'result', true),
  configFor('orio-result', 'result'),
  configFor('orio-traits', 'traits', true),
  configFor('orio-traits', 'traits'),
  configFor('orio-utils', 'utils', true),
  configFor('orio-utils', 'utils'),
  configFor('orio-stream', 'io'),
  configFor('orio-stream', 'io', true),
  configFor('orio-iter', 'iter'),
  configFor('orio-iter', 'iter', true),
  configFor('orio-core', 'orio', true),
  configFor('orio-core', 'orio'),
]
