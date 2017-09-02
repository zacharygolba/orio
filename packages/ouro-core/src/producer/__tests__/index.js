// @flow

import Ouro from '../../ouro'
import { createProducer, Indexed, Unbound } from '../'

describe('#createProducer()', () => {
  test('Array<T> => Indexed<T>', () => {
    const producer = createProducer([1, 2, 3])
    expect(producer).toBeInstanceOf(Indexed)
  })

  test('string => Indexed<T>', () => {
    const producer = createProducer('test')
    expect(producer).toBeInstanceOf(Indexed)
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

  test('Ouro<T> => Ouro<T>.producer', () => {
    const source = createProducer()
    const producer = createProducer(new Ouro(source))

    expect(producer).toBe(producer)
  })

  test('Iterator<T> => Unbound<T>', () => {
    const producer = createProducer(new Map().entries())
    expect(producer).toBeInstanceOf(Unbound)
  })

  test('null | void => Indexed<T>', () => {
    const producer = createProducer()

    expect(producer).toBeInstanceOf(Indexed)
  })

  // prettier-ignore
  ;[1, true, Symbol('test'), {}].forEach(source => {
    const type = String(source)

    test(`${type} => Indexed<${type}>`, () => {
      const producer = createProducer(source)

      expect(producer).toBeInstanceOf(Indexed)
      expect(producer.next()).toEqual(
        expect.objectContaining({
          value: source,
        }),
      )
    })
  })
})
