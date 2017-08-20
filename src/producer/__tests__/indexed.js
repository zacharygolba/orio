// @flow

import IndexedProducer from '../indexed'

test('#constructor()', () => {
  expect(new IndexedProducer('test')).toMatchSnapshot()
  expect(new IndexedProducer([1, 2, 3])).toMatchSnapshot()
})

test('#@@iterator()', () => {
  for (const item of new IndexedProducer('test')) {
    expect(item).toMatchSnapshot()
  }

  for (const item of new IndexedProducer([1, 2, 3])) {
    expect(item).toMatchSnapshot()
  }
})
