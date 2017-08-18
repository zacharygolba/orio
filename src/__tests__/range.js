// @flow

import range from '../range'

test('range()', () => {
  expect(range(Infinity)).toMatchSnapshot()
  expect(range(Infinity, 0)).toMatchSnapshot()
})

describe('Range<number> ASC', () => {
  let iter

  beforeEach(() => {
    iter = range(1, 3)
  })

  test('#next()', () => {
    expect(iter.next()).toMatchSnapshot()
    expect(iter.next()).toMatchSnapshot()
    expect(iter.next()).toMatchSnapshot()
    expect(iter.next()).toMatchSnapshot()
  })

  test('#sizeHint()', () => {
    expect(iter.sizeHint()).toEqual(3)
  })
})

describe('Range<number> DESC', () => {
  let iter

  beforeEach(() => {
    iter = range(3, 1)
  })

  test('#next()', () => {
    expect(iter.next()).toMatchSnapshot()
    expect(iter.next()).toMatchSnapshot()
    expect(iter.next()).toMatchSnapshot()
    expect(iter.next()).toMatchSnapshot()
  })

  test('#sizeHint()', () => {
    expect(iter.sizeHint()).toEqual(3)
  })
})

describe('Range<string> ASC', () => {
  let iter

  beforeEach(() => {
    iter = range('a', 'c')
  })

  test('#next()', () => {
    expect(iter.next()).toMatchSnapshot()
    expect(iter.next()).toMatchSnapshot()
    expect(iter.next()).toMatchSnapshot()
    expect(iter.next()).toMatchSnapshot()
  })

  test('#sizeHint()', () => {
    expect(iter.sizeHint()).toEqual(3)
  })
})

describe('Range<string> DESC', () => {
  let iter

  beforeEach(() => {
    iter = range('c', 'a')
  })

  test('#next()', () => {
    expect(iter.next()).toMatchSnapshot()
    expect(iter.next()).toMatchSnapshot()
    expect(iter.next()).toMatchSnapshot()
    expect(iter.next()).toMatchSnapshot()
  })

  test('#sizeHint()', () => {
    expect(iter.sizeHint()).toEqual(3)
  })
})
