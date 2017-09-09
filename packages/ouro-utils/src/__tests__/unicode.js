// @flow

import * as unicode from '../unicode'

const DECODED = 'test'

describe('utf16', () => {
  const ENCODED = Uint16Array.of(116, 101, 115, 116)

  describe('.decodeUtf16()', () => {
    test('with a string', () => {
      expect(unicode.decodeUtf16(DECODED)).toBe(DECODED)
    })

    test('with a Uint16Array', () => {
      expect(unicode.decodeUtf16(ENCODED)).toBe(DECODED)
    })
  })

  describe('.encodeUtf16()', () => {
    test('with a string', () => {
      expect(unicode.encodeUtf16(DECODED)).toEqual(ENCODED)
    })

    test('with a Uint16Array', () => {
      expect(unicode.encodeUtf16(ENCODED)).toEqual(ENCODED)
    })
  })
})
