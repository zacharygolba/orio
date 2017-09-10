// @flow

import * as result from 'orio-result'

import Reader from '../reader'

const SOURCE = {
  cancel: jest.fn(),
  read: jest.fn().mockImplementation(() => Promise.resolve(result.done())),
}

let producer

beforeEach(() => {
  producer = new Reader(SOURCE)
})

test('#constructor()', () => {
  expect(producer).toMatchSnapshot()
})

test('#drop()', () => {
  expect(producer.drop()).toBeUndefined()
  expect(SOURCE.cancel).toHaveBeenCalled()
})

test('#next()', async () => {
  expect(await producer.next()).toMatchSnapshot()
  expect(SOURCE.read).toHaveBeenCalled()
})
