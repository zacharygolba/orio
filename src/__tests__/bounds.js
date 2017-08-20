// @flow

import * as bounds from '../bounds'
import { createProducer } from '../producer'

test('#sizeOf()', () => {
  {
    const subject = 'test'
    expect(bounds.sizeOf(subject)).toBe(Infinity)
  }

  {
    const subject = createProducer('test')
    expect(bounds.sizeOf(subject)).toBe(4)
  }
})
