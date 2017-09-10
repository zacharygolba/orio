// @flow

import { Readable } from 'stream'

import Stream from '../../stream'
import {
  createProducer,
  Chars,
  Empty,
  Indexed,
  Once,
  Reader,
  Task,
  Unbound,
} from '../'

describe('#createProducer()', () => {
  test('null | void => Empty', () => {
    const producer = createProducer()
    expect(producer).toBeInstanceOf(Empty)
  })

  test('Promise<T> => Task<T>', () => {
    const producer = createProducer(Promise.resolve())
    expect(producer).toBeInstanceOf(Task)
  })

  test('ReadableStream => Reader<T>', () => {
    const source = new ReadableStream()
    const producer = createProducer(source)
    expect(producer).toBeInstanceOf(Reader)
  })

  test('Readable => Reader<T>', () => {
    const source = new Readable({ read: jest.fn() })
    const producer = createProducer(source)
    expect(producer).toBeInstanceOf(Reader)
  })

  test('Stream<T> => Stream<T>.producer', () => {
    const producer = new Empty()
    expect(createProducer(new Stream(producer))).toBe(producer)
  })

  test('Array<T> => Indexed<T>', () => {
    const producer = createProducer([1, 2, 3])
    expect(producer).toBeInstanceOf(Indexed)
  })

  test('string => Chars', () => {
    const producer = createProducer('test')
    expect(producer).toBeInstanceOf(Chars)
  })

  test('Iterable<T> => Unbound<T>', () => {
    const producer = createProducer(new Map().entries())
    expect(producer).toBeInstanceOf(Unbound)
  })

  // prettier-ignore
  ;[1, true, Symbol('test'), {}].forEach(source => {
    const type = String(source)

    test(`${type} => Once<${type}>`, async () => {
      const producer = createProducer(source)

      expect(producer).toBeInstanceOf(Once)
      expect(await producer.next()).toEqual(
        expect.objectContaining({
          value: source,
        }),
      )
    })
  })
})
