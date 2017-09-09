// @flow

import ToString from '../to-string'

const Target = ToString(class Subject {})

test('it adds an @@toStringTag method to a class', () => {
  expect(new Target().toString()).toBe('[object Subject]')
})
