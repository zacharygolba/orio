// @flow

import { Readable } from 'stream'

import ReadableWrapper from '../readable'

const failureSource = e =>
  new Readable({
    read() {
      this.emit('error', e)
    },
  })

const successSource = (data = Buffer.allocUnsafe(0)) => {
  let offset = 0

  return new Readable({
    read(size) {
      if (data.length === 0) {
        this.emit('end')
      } else if (offset >= data.length) {
        this.push(null)
      } else {
        this.push(data.slice(offset, offset + size))
        offset += size
      }
    },
  })
}

test('#cancel()', async () => {
  const wrapper = new ReadableWrapper(successSource())

  expect(() => wrapper.cancel()).not.toThrow()

  {
    const { done, value } = await wrapper.read()
    expect(done).toBe(true)
    expect(value).toBeUndefined()
  }
})

describe('#read()', () => {
  test('success', async () => {
    const data = Buffer.from('Hello World')
    let wrapper = new ReadableWrapper(successSource(data))

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

    {
      // A source that ends in-flight should not cause an infinite loop.
      wrapper = new ReadableWrapper(successSource())
      const { done, value } = await wrapper.read()

      expect(done).toBe(true)
      expect(value).toBeUndefined()
    }

    {
      // A consumed source should not cause an infinite loop.
      wrapper = new ReadableWrapper(wrapper.source)
      const { done, value } = await wrapper.read()

      expect(done).toBe(true)
      expect(value).toBeUndefined()
    }
  })

  test('early failure', async () => {
    const error = new Error('test')
    const wrapper = new ReadableWrapper(successSource(Buffer.alloc(0)))

    jest.spyOn(wrapper, 'cancel')

    wrapper.source.emit('error', error)

    await wrapper.read().catch(e => {
      expect(e).toBe(error)
      expect(wrapper.cancel).toHaveBeenCalled()
    })
  })

  test('in-flight failure', async () => {
    const error = new Error('test')
    const wrapper = new ReadableWrapper(failureSource(error))

    jest.spyOn(wrapper, 'cancel')

    await wrapper.read().catch(e => {
      expect(e).toBe(error)
      expect(wrapper.cancel).toHaveBeenCalled()
    })
  })
})
