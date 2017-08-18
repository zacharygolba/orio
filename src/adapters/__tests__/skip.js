// @flow

import Skip from '../skip'
import intoIter from '../../utils/into-iter'
import repeat from '../../range'

test('#next()', () => {
  const iter = new Skip(intoIter([1, 2, 3, 4, 5, 6]), 3)

  expect(iter.next()).toMatchSnapshot()
  expect(iter.next()).toMatchSnapshot()
  expect(iter.next()).toMatchSnapshot()
  expect(iter.next()).toMatchSnapshot()
})

test('#sizeHint()', () => {
  {
    const iter = new Skip(intoIter([1, 2, 3, 4, 5, 6]), 3)
    expect(iter.sizeHint()).toEqual(3)
  }

  {
    const iter = new Skip(repeat(), 3)
    expect(iter.sizeHint()).toEqual(Infinity)
  }
})
