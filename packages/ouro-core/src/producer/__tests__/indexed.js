// @flow

import Indexed from '../indexed'

describe('Indexed', () => {
  describe('source array', () => {
    let source
    let producer

    beforeEach(() => {
      source = [1, 2, 3]
      producer = new Indexed(source)
    })

    test('#constructor()', () => {
      expect(producer).toMatchSnapshot()
    })

    test('#@@iterator()', () => {
      for (const item of producer) {
        expect(item).toMatchSnapshot()
      }
    })
  })

  describe('source string', () => {
    let source
    let producer

    beforeEach(() => {
      source = 'test'
      producer = new Indexed(source)
    })

    test('#constructor()', () => {
      expect(producer).toMatchSnapshot()
    })

    test('#@@iterator()', () => {
      for (const item of producer) {
        expect(item).toMatchSnapshot()
      }
    })
  })
})
