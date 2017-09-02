// @flow

import { identity } from '../utils'

test('#identity()', () => {
  const subj = {}
  expect(identity(subj)).toBe(subj)
})
