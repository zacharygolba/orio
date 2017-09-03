// @flow

import { Chars, Numbers } from '../range'

describe('Numbers', () => {
  let producer

  describe('->', () => {
    beforeEach(() => {
      producer = new Numbers(1, 3)
    })

    test('#constructor()', () => {
      expect(new Numbers()).toMatchSnapshot()
      expect(new Numbers(1)).toMatchSnapshot()
      expect(new Numbers(1, 3)).toMatchSnapshot()
      expect(new Numbers(1, Infinity)).toMatchSnapshot()
      // $ExpectError
      expect(new Numbers('dog', 'cat')).toMatchSnapshot()
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
      producer = new Numbers(3, 1)
    })

    test('#constructor()', () => {
      expect(new Numbers(3, 1)).toMatchSnapshot()
      expect(new Numbers(Infinity, 1)).toMatchSnapshot()
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

describe('Chars', () => {
  let producer

  describe('->', () => {
    beforeEach(() => {
      producer = new Chars('a', 'c')
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
      producer = new Chars('c', 'a')
    })

    test('#constructor()', () => {
      expect(producer).toMatchSnapshot()
      expect(new Chars()).toMatchSnapshot()
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
