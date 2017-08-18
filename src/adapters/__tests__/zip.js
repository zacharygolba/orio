// @flow

import Zip from '../zip'
import intoIter from '../../utils/into-iter'
import repeat from '../../repeat'

test('#next()', () => {
  {
    const iter = new Zip(repeat('test'), intoIter([1, 2, 3]))

    expect(iter.next()).toMatchSnapshot()
    expect(iter.next()).toMatchSnapshot()
    expect(iter.next()).toMatchSnapshot()
    expect(iter.next()).toMatchSnapshot()
  }

  {
    const iter = new Zip(intoIter([1, 2, 3]), repeat('test'))

    expect(iter.next()).toMatchSnapshot()
    expect(iter.next()).toMatchSnapshot()
    expect(iter.next()).toMatchSnapshot()
    expect(iter.next()).toMatchSnapshot()
  }
})

test('#sizeHint()', () => {
  {
    const iter = new Zip(repeat('test'), intoIter([1, 2, 3]))
    expect(iter.sizeHint()).toEqual(3)
  }

  {
    const iter = new Zip(intoIter([1, 2, 3]), repeat('test'))
    expect(iter.sizeHint()).toEqual(3)
  }

  {
    const iter = new Zip(repeat('test'), repeat('test'))
    expect(iter.sizeHint()).toEqual(Infinity)
  }
})
