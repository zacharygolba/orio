// @flow

export interface Thenable<+T> {
  then<U>(
    onFulfill?: (T) => Thenable<U> | U,
    onReject?: (*) => Thenable<U> | U,
  ): Thenable<U>,
  catch<U>(onReject?: (*) => Thenable<U> | U): Thenable<T | U>,
}
