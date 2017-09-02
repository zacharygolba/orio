// @flow

import * as result from '../'

test('#done()', () => {
  expect(result.done()).toMatchSnapshot()
  expect(result.done('test')).toMatchSnapshot()
})

test('#next()', () => {
  expect(result.next('test')).toMatchSnapshot()
})
