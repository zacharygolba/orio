// @flow

import * as result from 'ouro-result'
import { AsIterator, ToString } from 'ouro-traits'

import type { Drop } from '../types'

@ToString
@AsIterator
export default class Cycle<T> implements Drop, Iterator<T> {
  /*:: @@iterator: () => Iterator<T> */
  done: boolean
  index: number
  items: Array<T>
  producer: Drop & Iterator<T>
  useProducer: boolean

  constructor(producer: Drop & Iterator<T>) {
    this.done = false
    this.index = 0
    this.items = []
    this.producer = producer
    this.useProducer = true
  }

  drop(): void {
    this.done = true
    this.index = 0
    this.items = []
    this.producer.drop()
  }

  next(): IteratorResult<T, void> {
    if (this.done) {
      return result.done()
    }

    if (this.useProducer) {
      const next = this.producer.next()

      if (next.done) {
        this.useProducer = false
        this.producer.drop()
      } else {
        this.items.push(next.value)
        return next
      }
    }

    if (this.index >= this.items.length) {
      this.index = 0
    }

    const value = this.items[this.index]

    this.index += 1
    return result.next(value)
  }
}
