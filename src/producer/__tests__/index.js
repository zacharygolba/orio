// @flow

import Iter from '../../iter'
import {
  createProducer,
  IndexedProducer,
  MapProducer,
  SetProducer,
  UnboundProducer,
} from '../'

describe('#createProducer()', () => {
  test('Array<T> => IndexedProducer<T>', () => {
    const producer = createProducer([1, 2, 3])
    expect(producer).toBeInstanceOf(IndexedProducer)
  })

  test('string => IndexedProducer<T>', () => {
    const producer = createProducer('test')
    expect(producer).toBeInstanceOf(IndexedProducer)
  })

  test('Map<K, V> => MapProducer<[K, V]>', () => {
    const producer = createProducer(new Map([['test', 'test']]))
    expect(producer).toBeInstanceOf(MapProducer)
  })

  test('Set<T> => SetProducer<T>', () => {
    const producer = createProducer(new Set(['test', 'test']))
    expect(producer).toBeInstanceOf(SetProducer)
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
    expect(producer.sizeHint()).toBe(0)
  })

  ;[1, true, Symbol('test'), {}].forEach((source) => {
    const type = String(source)

    test(`${type} => IndexedProducer<${type}>`, () => {
      const producer = createProducer(source)

      expect(producer).toBeInstanceOf(IndexedProducer)
      expect(producer.sizeHint()).toBe(1)
      expect(producer.next()).toEqual(
        expect.objectContaining({
          value: source,
        })
      )
    })
  })
})
