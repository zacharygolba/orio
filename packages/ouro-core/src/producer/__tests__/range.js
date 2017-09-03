// @flow

import { CharRange, NumberRange } from '../range'

describe('NumberRange', () => {
  let producer

  describe('->', () => {
    beforeEach(() => {
      producer = new NumberRange(1, 3)
    })

    test('#constructor()', () => {
      expect(new NumberRange()).toMatchSnapshot()
      expect(new NumberRange(1)).toMatchSnapshot()
      expect(new NumberRange(1, 3)).toMatchSnapshot()
      expect(new NumberRange(1, Infinity)).toMatchSnapshot()
      // $ExpectError
      expect(new NumberRange('dog', 'cat')).toMatchSnapshot()
    })

    test('#drop()', () => {
      expect(producer.drop()).toBeUndefined()
      expect(producer.next()).toMatchSnapshot()
      expect(producer).toMatchSnapshot()
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
      producer = new NumberRange(3, 1)
    })

    test('#constructor()', () => {
      expect(new NumberRange(3, 1)).toMatchSnapshot()
      expect(new NumberRange(Infinity, 1)).toMatchSnapshot()
    })

    test('#drop()', () => {
      expect(producer.drop()).toBeUndefined()
      expect(producer.next()).toMatchSnapshot()
      expect(producer).toMatchSnapshot()
    })

    test('#next()', () => {
      expect(producer.next()).toMatchSnapshot()
      expect(producer.next()).toMatchSnapshot()
      expect(producer.next()).toMatchSnapshot()
      expect(producer.next()).toMatchSnapshot()
    })
  })
})

describe('CharRange', () => {
  let producer

  describe('->', () => {
    beforeEach(() => {
      producer = new CharRange('a', 'c')
    })

    test('#drop()', () => {
      expect(producer.drop()).toBeUndefined()
      expect(producer.next()).toMatchSnapshot()
      expect(producer).toMatchSnapshot()
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
      producer = new CharRange('c', 'a')
    })

    test('#constructor()', () => {
      expect(producer).toMatchSnapshot()
      expect(new CharRange()).toMatchSnapshot()
    })

    test('#drop()', () => {
      expect(producer.drop()).toBeUndefined()
      expect(producer.next()).toMatchSnapshot()
      expect(producer).toMatchSnapshot()
    })

    test('#next()', () => {
      expect(producer.next()).toMatchSnapshot()
      expect(producer.next()).toMatchSnapshot()
      expect(producer.next()).toMatchSnapshot()
      expect(producer.next()).toMatchSnapshot()
    })
  })
})
