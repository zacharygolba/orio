// @flow

import Empty from '../empty'
import Unbound from '../unbound'

let producer
let source

beforeEach(() => {
  source = new Empty()
  producer = new Unbound(source)
})

test('#constructor()', () => {
  expect(producer).toMatchSnapshot()
})

describe('#drop()', () => {
  beforeEach(() => {
    jest.spyOn(source, 'drop')
  })

  test('with an async producer', async () => {
    expect(producer.drop()).toBeUndefined()
    expect(source.drop).toHaveBeenCalled()
    expect(await producer.next()).toMatchSnapshot()
  })

  test('with an iterable', async () => {
    producer = new Unbound(new Set([1, 2, 3]).values())
    expect(producer.drop()).toBeUndefined()
    expect(await producer.next()).toMatchSnapshot()
  })
})

test('#next()', async () => {
  expect(await producer.next()).toMatchSnapshot()
  expect(await producer.next()).toMatchSnapshot()
})
