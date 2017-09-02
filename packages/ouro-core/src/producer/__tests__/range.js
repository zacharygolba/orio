// @flow

import { CharProducer, NumberProducer } from '../range'

describe('NumberProducer', () => {
  let producer

  describe('->', () => {
    beforeEach(() => {
      producer = new NumberProducer(1, 3)
    })

    test('#constructor()', () => {
      expect(new NumberProducer()).toMatchSnapshot()
      expect(new NumberProducer(1)).toMatchSnapshot()
      expect(new NumberProducer(1, 3)).toMatchSnapshot()
      expect(new NumberProducer(1, Infinity)).toMatchSnapshot()
      // $ExpectError
      expect(new NumberProducer('dog', 'cat')).toMatchSnapshot()
    })

    test('#@@iterator()', () => {
      for (const item of producer) {
        expect(item).toMatchSnapshot()
      }
    })

    test('#next()', () => {
      expect(producer.next()).toMatchSnapshot()
      expect(producer.next()).toMatchSnapshot()
      expect(producer.next()).toMatchSnapshot()
      expect(producer.next()).toMatchSnapshot()
    })
  })

  describe('<-', () => {
    beforeEach(() => {
      producer = new NumberProducer(3, 1)
    })

    test('#constructor()', () => {
      expect(new NumberProducer(3, 1)).toMatchSnapshot()
      expect(new NumberProducer(Infinity, 1)).toMatchSnapshot()
    })

    test('#@@iterator()', () => {
      for (const item of producer) {
        expect(item).toMatchSnapshot()
      }
    })

    test('#next()', () => {
      expect(producer.next()).toMatchSnapshot()
      expect(producer.next()).toMatchSnapshot()
      expect(producer.next()).toMatchSnapshot()
      expect(producer.next()).toMatchSnapshot()
    })
  })
})

describe('CharProducer', () => {
  let producer

  describe('->', () => {
    beforeEach(() => {
      producer = new CharProducer('a', 'c')
    })

    test('#@@iterator()', () => {
      for (const item of producer) {
        expect(item).toMatchSnapshot()
      }
    })

    test('#next()', () => {
      expect(producer.next()).toMatchSnapshot()
      expect(producer.next()).toMatchSnapshot()
      expect(producer.next()).toMatchSnapshot()
      expect(producer.next()).toMatchSnapshot()
    })
  })

  describe('<-', () => {
    beforeEach(() => {
      producer = new CharProducer('c', 'a')
    })

    test('#constructor()', () => {
      expect(producer).toMatchSnapshot()
      expect(new CharProducer()).toMatchSnapshot()
    })

    test('#@@iterator()', () => {
      for (const item of producer) {
        expect(item).toMatchSnapshot()
      }
    })

    test('#next()', () => {
      expect(producer.next()).toMatchSnapshot()
      expect(producer.next()).toMatchSnapshot()
      expect(producer.next()).toMatchSnapshot()
      expect(producer.next()).toMatchSnapshot()
    })
  })
})
