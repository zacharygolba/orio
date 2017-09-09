// @flow

import identity from '../identity'

let subj

beforeEach(() => {
  subj = {}
})

test('it returns the input argument', () => {
  expect(identity(subj)).toBe(subj)
})
