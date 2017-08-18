// @flow

type MaybeIter = {
  sizeHint?: () => number,
}

export default function sizeOf<I: MaybeIter>(iter: I): number {
  return typeof iter.sizeHint === 'function' ? iter.sizeHint() : Infinity
}
