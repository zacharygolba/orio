// @flow

import * as timers from '../timers'

jest.mock('../consts')

beforeAll(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.clearAllTimers()
})

test('.immediate()', async () => {
  const handle = timers.immediate()

  jest.runAllTimers()

  expect(setTimeout).toHaveBeenCalled()
  expect(await handle).toBeUndefined()
})
