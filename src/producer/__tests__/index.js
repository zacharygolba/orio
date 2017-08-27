// @flow

import Iter from '../../iter'
import { createProducer, IndexedProducer, UnboundProducer } from '../'

describe('#createProducer()', () => {
  test('Array<T> => IndexedProducer<T>', () => {
    const producer = createProducer([1, 2, 3])
    expect(producer).toBeInstanceOf(IndexedProducer)
  })

  test('string => IndexedProducer<T>', () => {
    const producer = createProducer('test')
    expect(producer).toBeInstanceOf(IndexedProducer)
  })

  test('Map<K, V> => MapIterator<[K, V]>', () => {
    const entry = ['test', 'test']
    const producer = createProducer(new Map([entry]))

    expect(producer[Symbol.iterator]).toEqual(expect.any(Function))
    expect(producer.next()).toHaveProperty('value', entry)
  })

  test('Set<T> => SetIterator<T>', () => {
    const value = 'test'
    const producer = createProducer(new Set([value]))

    expect(producer[Symbol.iterator]).toEqual(expect.any(Function))
    expect(producer.next()).toHaveProperty('value', value)
  })

  test('Iter<T> => Iter<T>.producer', () => {
    const source = createProducer()
    const producer = createProducer(new Iter(source))

    expect(producer).toBe(producer)
  })

  test('Iterator<T> => UnboundProducer<T>', () => {
    const producer = createProducer(new Map().entries())
    expect(producer).toBeInstanceOf(UnboundProducer)
  })

  test('null | void => IndexedProducer<T>', () => {
    const producer = createProducer()

    expect(producer).toBeInstanceOf(IndexedProducer)
  })

  // prettier-ignore
  ;[1, true, Symbol('test'), {}].forEach(source => {
    const type = String(source)

    test(`${type} => IndexedProducer<${type}>`, () => {
      const producer = createProducer(source)

      expect(producer).toBeInstanceOf(IndexedProducer)
      expect(producer.next()).toEqual(
        expect.objectContaining({
          value: source,
        }),
      )
    })
  })
})
