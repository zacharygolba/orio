const path = require('path')

const { rollup } = require('rollup')
const babel = require('rollup-plugin-babel')
const cleanup = require('rollup-plugin-cleanup')
const fs = require('mz/fs')
const resolve = require('rollup-plugin-node-resolve')

const paths = require('./utils/paths')
const run = require('./utils/run')

const build = async ({ format, moduleName, preferConst, targets }) => {
  const bundle = await rollup({
    entry: path.join(paths.SRC, 'index.js'),
    plugins: [
      babel({
        babelrc: false,
        presets: [
          'minify',
          ['env', {
            modules: false,
            targets,
          }],
        ],
        plugins: [
          'external-helpers',
          'transform-flow-strip-types',
        ],
      }),
      cleanup({
        comments: 'none',
      }),
      resolve(),
    ],
  })

  return bundle.generate({
    format,
    moduleName,
    preferConst,
    sourceMap: true,
  })
}

const main = async () => {
  await require('./clean')
  await fs.mkdir(paths.DIST)

  const [cjs, es, umd] = await Promise.all([
    build({
      format: 'cjs',
      preferConst: true,
      targets: {
        node: '6.11',
      },
    }),
    build({
      format: 'es',
      preferConst: true,
      targets: {
        node: '6.11',
      },
    }),
    build({
      format: 'umd',
      moduleName: 'iter',
      preferConst: true,
      targets: {
        browser: 'last 2 versions',
      }
    }),
  ])

  await Promise.all([
    fs.writeFile(path.join(paths.DIST, 'index.browser.js.map'), umd.map),
    fs.writeFile(path.join(paths.DIST, 'index.browser.js'), umd.code),
    fs.writeFile(path.join(paths.DIST, 'index.es.js.map'), es.map),
    fs.writeFile(path.join(paths.DIST, 'index.es.js'), es.code),
    fs.writeFile(path.join(paths.DIST, 'index.js.map'), cjs.map),
    fs.writeFile(path.join(paths.DIST, 'index.js'), cjs.code),
  ])

  {
    const data = await fs.readFile(path.join(paths.DIST, 'index.js'), 'utf8')
    await fs.writeFile(path.join(paths.DIST, 'index.js'), data.replace(/\n/g, ''))
  }

  {
    const data = await fs.readFile(path.join(paths.DIST, 'index.browser.js'), 'utf8')
    await fs.writeFile(path.join(paths.DIST, 'index.browser.js'), data.replace(/\n/g, ''))
  }

  await run('gzip', path.join(paths.DIST, 'index.browser.js'))
}

main()
