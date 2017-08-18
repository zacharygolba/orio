// @flow

import intoIter from '../into-iter'
import { CollectionIterator, IndexedIterator, UnboundedIterator } from '../../iterator'

describe('source: any', () => {
  let iter

  beforeEach(() => {
    iter = intoIter(1)
  })

  test('it returns the correct iterator type', () => {
    expect(iter).toBeInstanceOf(IndexedIterator)
  })

  test('#next()', () => {
    expect(iter.next()).toEqual({
      done: false,
      value: 1,
    })

    expect(iter.next()).toEqual({
      done: true,
      value: undefined,
    })
  })

  test('#sizeHint()', () => {
    expect(iter.sizeHint()).toEqual(1)
  })
})

describe('source: null', () => {
  let iter

  beforeEach(() => {
    iter = intoIter(null)
  })

  test('it returns the correct iterator type', () => {
    expect(iter).toBeInstanceOf(IndexedIterator)
  })

  test('#next()', () => {
    expect(iter.next()).toEqual({
      done: true,
      value: undefined,
    })
  })

  test('#sizeHint()', () => {
    expect(iter.sizeHint()).toEqual(0)
  })
})

describe('source: string', () => {
  const source = 'test'
  let iter

  beforeEach(() => {
    iter = intoIter(source)
  })

  test('it returns the correct iterator type', () => {
    expect(iter).toBeInstanceOf(IndexedIterator)
  })

  test('#next()', () => {
    for (const value of source) {
      expect(iter.next()).toEqual({
        done: false,
        value,
      })
    }

    expect(iter.next()).toEqual({
      done: true,
      value: undefined,
    })
  })

  test('#sizeHint()', () => {
    expect(iter.sizeHint()).toEqual(source.length)
  })
})

describe('source: void', () => {
  let iter

  beforeEach(() => {
    iter = intoIter()
  })

  test('it returns the correct iterator type', () => {
    expect(iter).toBeInstanceOf(IndexedIterator)
  })

  test('#next()', () => {
    expect(iter.next()).toEqual({
      done: true,
      value: undefined,
    })
  })

  test('#sizeHint()', () => {
    expect(iter.sizeHint()).toEqual(0)
  })
})

describe('source: Array', () => {
  const source = [1, 2, 3]
  let iter

  beforeEach(() => {
    iter = intoIter(source)
  })

  test('it returns the correct iterator type', () => {
    expect(iter).toBeInstanceOf(IndexedIterator)
  })

  test('#next()', () => {
    for (const value of source) {
      expect(iter.next()).toEqual({
        done: false,
        value,
      })
    }

    expect(iter.next()).toEqual({
      done: true,
      value: undefined,
    })
  })

  test('#sizeHint()', () => {
    expect(iter.sizeHint()).toEqual(source.length)
  })
})

describe('source: Generator', () => {
  let iter

  function* threeTimes(value) {
    for (let i = 0; i < 3; i++) {
      yield value
    }
  }

  beforeEach(() => {
    iter = intoIter(threeTimes('test'))
  })

  test('it returns the correct iterator type', () => {
    expect(iter).toBeInstanceOf(UnboundedIterator)
  })

  test('#next()', () => {
    for (const value of threeTimes('test')) {
      expect(iter.next()).toEqual({
        done: false,
        value,
      })
    }

    expect(iter.next()).toEqual({
      done: true,
      value: undefined,
    })
  })

  test('#sizeHint()', () => {
    expect(iter.sizeHint()).toEqual(Infinity)
  })
})

describe('source: Set', () => {
  const source = new Set([1, 2, 3])
  let iter

  beforeEach(() => {
    iter = intoIter(source)
  })

  test('it returns the correct iterator type', () => {
    expect(iter).toBeInstanceOf(CollectionIterator)
  })

  test('#next()', () => {
    for (const value of source) {
      expect(iter.next()).toEqual({
        done: false,
        value,
      })
    }

    expect(iter.next()).toEqual({
      done: true,
      value: undefined,
    })
  })

  test('#sizeHint()', () => {
    expect(iter.sizeHint()).toEqual(source.size)
  })
})

describe('source: Map', () => {
  const source = new Map(Object.entries({ a: 1, b: 2, c: 3 }))
  let iter

  beforeEach(() => {
    iter = intoIter(source)
  })

  test('it returns the correct iterator type', () => {
    expect(iter).toBeInstanceOf(CollectionIterator)
  })

  test('#next()', () => {
    for (const value of source) {
      expect(iter.next()).toEqual({
        done: false,
        value,
      })
    }

    expect(iter.next()).toEqual({
      done: true,
      value: undefined,
    })
  })

  test('#sizeHint()', () => {
    expect(iter.sizeHint()).toEqual(source.size)
  })
})
