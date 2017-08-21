// @flow

import ProducerBase from '../base'

let subj

beforeEach(() => {
  subj = new ProducerBase()
})

test('#next()', () => {
  expect(subj.next).toThrow('unimplemented')
})

test('#sizeHint()', () => {
  expect(subj.sizeHint).toThrow('unimplemented')
})
