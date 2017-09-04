// @flow

import Once from '../once'

let producer

beforeEach(() => {
  producer = new Once('test')
})

test('#constructor()', () => {
  expect(producer).toMatchSnapshot()
})

test('#drop()', () => {
  expect(producer.drop()).toBeUndefined()
  expect(producer.next()).toMatchSnapshot()
  expect(producer).toMatchSnapshot()
})

test('#next()', () => {
  expect(producer.next()).toMatchSnapshot()
  expect(producer.next()).toMatchSnapshot()
})
