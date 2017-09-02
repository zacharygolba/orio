// @flow

import AsIterator from '../as-iterator'

const Target = AsIterator(class Subject {})

test('it adds an @@iterator method to a class', () => {
  const subj = new Target()

  // $FlowIgnore
  expect(subj[Symbol.iterator]()).toBe(subj)
})
