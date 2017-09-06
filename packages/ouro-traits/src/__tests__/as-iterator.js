// @flow

import { AsAsyncIterator, AsIterator } from '../as-iterator'

const AsyncTarget = AsAsyncIterator(
  class {
    /*:: @@asyncIterator: () => $AsyncIterator<*, void, void> */

    next(): Promise<IteratorResult<*, void>> {
      return Promise.resolve({
        done: false,
        value: this,
      })
    }
  },
)

const SyncTarget = AsIterator(
  class {
    /*:: @@iterator: () => Iterator<*> */

    next(): IteratorResult<*, void> {
      return {
        done: false,
        value: this,
      }
    }
  },
)

test('@AsAsyncIterator', () => {
  const subj = new AsyncTarget()

  // $ExpectError
  AsAsyncIterator(class {})
  // $FlowIgnore
  expect(subj[Symbol.asyncIterator]()).toBe(subj)
})

test('@AsIterator', () => {
  const subj = new SyncTarget()

  // $ExpectError
  AsIterator(class {})
  // $FlowIgnore
  expect(subj[Symbol.iterator]()).toBe(subj)
})
