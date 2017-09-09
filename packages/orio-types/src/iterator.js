// @flow

import type { Drop } from './drop'

export type AsyncIterator<+T> = $AsyncIterator<T, void, void>
export type AsyncIteratorResult<I, R> = Promise<IteratorResult<I, R>>
export type Source<+T> = $ReadOnlyArray<T> | Iterable<T> | ?T

export interface Producer<+T> extends Drop, Iterable<T>, Iterator<T> {}
