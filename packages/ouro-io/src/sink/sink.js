// @flow

import { ToString } from 'ouro-traits'
import type { AsyncConsumer, AsyncSource } from 'ouro-types'

import * as stream from '../stream'
import type { Stream } from '../stream'

@ToString
export default class Sink<T> implements AsyncConsumer<T> {
  consumer: AsyncConsumer<T>
  producer: Stream<T>

  constructor(consumer: AsyncConsumer<T>) {
    this.consumer = consumer
    this.producer = stream.empty()
  }

  drop(): void {
    this.consumer.drop()
  }

  flush(): Promise<Sink<T>> {
    return this.producer
      .forEach(chunk => this.consumer.write(chunk))
      .then(() => {
        this.drop()
        return this
      })
      .catch(e => {
        this.drop()
        return Promise.reject(e)
      })
  }

  push(producer: AsyncSource<T>): Sink<T> {
    this.producer = this.producer.chain(producer)
    return this
  }

  write(chunk: T): Promise<void> {
    return this.consumer.write(chunk)
  }
}
