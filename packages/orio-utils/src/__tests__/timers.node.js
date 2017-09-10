// @flow

import * as timers from '../timers'

beforeAll(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.clearAllTimers()
})

test('.immediate()', async () => {
  const handle = timers.immediate()

  jest.runAllImmediates()

  expect(setImmediate).toHaveBeenCalled()
  expect(await handle).toBeUndefined()
})
