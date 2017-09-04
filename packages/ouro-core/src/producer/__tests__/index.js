// @flow

import Iter from '../../iter'
import { createProducer, Chars, Empty, Indexed, Once, Unbound } from '../'

describe('#createProducer()', () => {
  test('Array<T> => Indexed<T>', () => {
    const producer = createProducer([1, 2, 3])
    expect(producer).toBeInstanceOf(Indexed)
  })

  test('string => Chars', () => {
    const producer = createProducer('test')
    expect(producer).toBeInstanceOf(Chars)
  })

  test('Map<K, V> => MapIterator<[K, V]>', () => {
    const entry = ['test', 'test']
    const producer = createProducer(new Map([entry]))

    // $FlowIgnore
    expect(producer[Symbol.iterator]).toEqual(expect.any(Function))
    expect(producer.next()).toHaveProperty('value', entry)
  })

  test('Set<T> => SetIterator<T>', () => {
    const value = 'test'
    const producer = createProducer(new Set([value]))

    // $FlowIgnore
    expect(producer[Symbol.iterator]).toEqual(expect.any(Function))
    expect(producer.next()).toHaveProperty('value', value)
  })

  test('Iter<T> => Iter<T>.producer', () => {
    const source = createProducer()
    const producer = createProducer(new Iter(source))

    expect(producer).toBe(producer)
  })

  test('Iterator<T> => Unbound<T>', () => {
    const producer = createProducer(new Map().entries())
    expect(producer).toBeInstanceOf(Unbound)
  })

  test('null | void => Empty', () => {
    const producer = createProducer()

    expect(producer).toBeInstanceOf(Empty)
  })

  // prettier-ignore
  ;[1, true, Symbol('test'), {}].forEach(source => {
    const type = String(source)

    test(`${type} => Once<${type}>`, () => {
      const producer = createProducer(source)

      expect(producer).toBeInstanceOf(Once)
      expect(producer.next()).toEqual(
        expect.objectContaining({
          value: source,
        }),
      )
    })
  })
})
