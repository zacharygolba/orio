// @flow

import * as timers from '../timers'

test('.setImmediate()', async () => {
  expect(await timers.setImmediate()).toBeUndefined()
})
