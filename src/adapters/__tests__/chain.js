// @flow

import Chain from '../chain'
import intoIter from '../../utils/into-iter'
import repeat from '../../repeat'

test('#next()', () => {
  const iter = new Chain(intoIter([1, 2, 3]), intoIter([4, 5, 6]))

  expect(iter.next()).toMatchSnapshot()
  expect(iter.next()).toMatchSnapshot()
  expect(iter.next()).toMatchSnapshot()
  expect(iter.next()).toMatchSnapshot()
  expect(iter.next()).toMatchSnapshot()
  expect(iter.next()).toMatchSnapshot()
  expect(iter.next()).toMatchSnapshot()
})

test('#sizeHint()', () => {
  {
    const iter = new Chain(intoIter([1, 2, 3]), intoIter([4, 5, 6]))
    expect(iter.sizeHint()).toEqual(6)
  }

  {
    const iter = new Chain(repeat(), intoIter([4, 5, 6]))
    expect(iter.sizeHint()).toEqual(Infinity)
  }

  {
    const iter = new Chain(intoIter([1, 2, 3]), repeat())
    expect(iter.sizeHint()).toEqual(Infinity)
  }

  {
    const iter = new Chain(repeat(), repeat())
    expect(iter.sizeHint()).toEqual(Infinity)
  }
})
