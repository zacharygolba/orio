// @flow

export default class ProducerBase<T> implements Iterator<T> {
  // eslint-disable-next-line prettier/prettier
  /*:: @@iterator: () => Iterator<T>; */

  // $FlowIgnore
  get [Symbol.toStringTag](): string {
    return this.constructor.name
  }

  // $FlowIgnore
  [Symbol.iterator](): Iterator<T> {
    return this
  }

  next(): IteratorResult<T, void> {
    throw new Error('unimplemented')
  }
}
