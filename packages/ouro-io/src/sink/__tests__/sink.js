// @flow

import { Writable } from 'stream'

import * as stream from '../../stream'
import { createConsumer } from '../consumer'
import Sink from '../sink'

const fn = jest.fn((chunk, _, cb) => cb())
let producer
let subj

beforeEach(() => {
  const consumer = createConsumer(new Writable({ write: fn, writev: fn }))

  subj = new Sink(consumer)
  ;({ producer } = subj)

  jest.spyOn(subj.consumer, 'drop')
  jest.spyOn(producer, 'chain')
})

test('#constructor()', () => {
  expect(subj).toMatchSnapshot()
})

test('#drop()', () => {
  expect(subj.drop()).toBeUndefined()
  expect(subj.consumer.drop).toHaveBeenCalled()
})

describe('#flush()', () => {
  test('success', async () => {
    subj = subj.push(stream.from('test'))

    expect(await subj.flush()).toBe(subj)
    expect(fn).toHaveBeenCalledTimes(4)
    expect(subj.consumer.drop).toHaveBeenCalled()
  })

  test('failure', async () => {
    subj = subj.push(stream.from([{}, {}, {}]))

    await subj.flush().catch(e => expect(e).not.toBeNull())
    expect(subj.consumer.drop).toHaveBeenCalled()
  })
})

test('#push()', () => {
  const producerB = stream.empty()

  expect(subj.push(producerB)).toBe(subj)
  expect(producer.chain).toHaveBeenLastCalledWith(producerB)
})

test('#write()', async () => {
  const chunk = Buffer.allocUnsafe(0)

  expect(await subj.write(chunk)).toBeUndefined()
  expect(fn).toHaveBeenCalledWith(chunk, 'buffer', expect.any(Function))
})
