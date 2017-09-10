// @flow

import { Readable } from 'stream'

import ReadableWrapper from '../readable'

let data: Buffer
let wrapper: ReadableWrapper<Buffer>

beforeEach(() => {
  let offset = 0

  data = Buffer.from('Hello World')
  wrapper = new ReadableWrapper(
    new Readable({
      read(size) {
        if (offset >= data.length) {
          this.push(null)
        } else {
          this.push(data.slice(offset, offset + size))
          offset += size
        }
      },
    }),
  )

  jest.spyOn(wrapper, 'cancel')
  jest.spyOn(wrapper.source, 'unpipe')
  jest.spyOn(wrapper.pipe, 'removeAllListeners')
})

test('#constructor()', () => {
  expect(wrapper).toMatchSnapshot()
})

test('#cancel()', async () => {
  expect(() => wrapper.cancel()).not.toThrow()
  expect(wrapper.source.unpipe).toHaveBeenCalled()
  expect(wrapper.pipe.removeAllListeners).toHaveBeenCalled()

  {
    const { done, value } = await wrapper.read()
    expect(done).toBe(true)
    expect(value).toBeUndefined()
  }
})

describe('#read()', () => {
  test('success', async () => {
    {
      const { done, value } = await wrapper.read()
      expect(done).toBe(false)
      expect(value).toEqual(data)
    }

    {
      const { done, value } = await wrapper.read()
      expect(done).toBe(true)
      expect(value).toBeUndefined()
    }
  })

  test('failure', async () => {
    const error = new Error('test')

    wrapper.pipe.emit('error', error)
    await wrapper.read().catch(e => {
      expect(e).toBe(error)
      expect(wrapper.cancel).toHaveBeenCalled()
    })
  })

  test('upstream failure', async () => {
    const error = new Error('test')

    wrapper.source.emit('error', error)
    await wrapper.read().catch(e => {
      expect(e).toBe(error)
      expect(wrapper.cancel).toHaveBeenCalled()
    })
  })
})
