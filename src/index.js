/* @flow */

import From from './from'
import Range from './range'
import Repeat from './repeat'
import type { Iter } from './types'

/**
 * Creates a new instance of Iter from an Iterable.
 */
export const from = <T>(source: Iterable<T>): Iter<T> =>
  new From(source)

/**
 * Creates an instance of Iter that iterates over a range of integers.
 */
export const range = (start: number, end?: number): Iter<number> =>
  new Range(start, end)

/**
 * Creates an instance of Iter that infinitely repeats the value passed
 * as an argument.
 */
export const repeat = <T>(value: T): Iter<T> =>
  new Repeat(value)
