// @flow

export type AsyncIterator<I> = $AsyncIterator<I, void, void>
export type AsyncIteratorResult<I, R> = Promise<IteratorResult<I, R>>
