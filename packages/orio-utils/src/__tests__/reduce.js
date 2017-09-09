// @flow

import type { AsyncIteratorResult } from 'orio-types'

import { reduce, reduceAsync } from '../reduce'

describe('.reduce()', () => {
  let source

  beforeEach(() => {
    source = new Set([1, 2, 3]).values()
  })

  test('with an initial value', () => {
    expect(reduce((a, b) => a + b, 0, source)).toBe(6)
  })

  test('without an initial value', () => {
    expect(reduce((a = 0, b) => a + b, undefined, source)).toBe(6)
  })
})

describe('.reduceAsync()', () => {
  let source

  class AsyncIter<T> {
    /*:: @@asyncIterator: () => $AsyncIterator<T, void, void> */
    items: Array<T>

    constructor(...items: Array<T>) {
      this.items = items
    }

    async next(): AsyncIteratorResult<T, void> {
      if (this.items.length > 0) {
        return {
          done: false,
          value: this.items.shift(),
        }
      }

      return {
        done: true,
        value: undefined,
      }
    }
  }

  beforeEach(() => {
    source = new AsyncIter(1, 2, 3)
  })

  test('with an initial value', async () => {
    expect(await reduceAsync(async (a, b) => a + b, 0, source)).toBe(6)
  })

  test('without an initial value', async () => {
    expect(
      await reduceAsync(async (a = 0, b) => a + b, undefined, source),
    ).toBe(6)
  })
})
