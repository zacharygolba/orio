// @flow

import { Suite } from 'benchmark'
import { generate } from 'pw-generator'

// import lazy from './lazy'
// import lodash from './lodash'

new Suite('Password Generator')
  .add('iter.js', generate)
  // .add('lazy.js', lazy)
  // .add('lodash', lodash)
  .on('cycle', ({ target }) => {
    console.log(String(target))
  })
  .on('complete', function _() {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`)
  })
  .run()
