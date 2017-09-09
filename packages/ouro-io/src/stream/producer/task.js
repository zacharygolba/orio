// @flow

import { AsAsyncIterator, ToString } from 'ouro-traits'
import type {
  AsyncProducer,
  AsyncIteratorResult,
  AsyncSource,
} from 'ouro-types'

import { createProducer } from './'

@ToString
@AsAsyncIterator
export default class TaskProducer<T> implements AsyncProducer<T> {
  /*:: @@asyncIterator: () => AsyncIterator<T> */
  task: Promise<AsyncProducer<T>>

  constructor(task: Promise<AsyncSource<T>>) {
    this.task = task.then(createProducer)
  }

  drop(): void {
    this.task.then(producer => producer.drop())
  }

  next(): AsyncIteratorResult<T, void> {
    return this.task.then(producer => producer.next())
  }
}
