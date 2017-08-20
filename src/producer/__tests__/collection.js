// @flow

import { MapProducer, SetProducer } from '../collection'

describe('MapProducer', () => {
  let source
  let producer

  beforeEach(() => {
    source = new Map([[1, 2], [3, 4]])
    producer = new MapProducer(source)
  })

  test('#constructor()', () => {
    expect(producer).toMatchSnapshot()
  })

  test('#@@iterator()', () => {
    for (const item of producer) {
      expect(item).toMatchSnapshot()
    }
  })

  test('#sizeHint()', () => {
    expect(producer.sizeHint()).toBe(source.size)
  })
})

describe('SetProducer', () => {
  let source
  let producer

  beforeEach(() => {
    source = new Set([1, 2, 3])
    producer = new SetProducer(source)
  })

  test('#constructor()', () => {
    expect(producer).toMatchSnapshot()
  })

  test('#@@iterator()', () => {
    for (const item of producer) {
      expect(item).toMatchSnapshot()
    }
  })

  test('#sizeHint()', () => {
    expect(producer.sizeHint()).toBe(source.size)
  })
})
