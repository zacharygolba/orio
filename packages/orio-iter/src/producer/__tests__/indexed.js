// @flow

import Indexed from '../indexed'

const SOURCE = [1, 2, 3]
let producer

beforeEach(() => {
  producer = new Indexed(SOURCE)
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
  expect(producer.next()).toMatchSnapshot()
  expect(producer.next()).toMatchSnapshot()
})
