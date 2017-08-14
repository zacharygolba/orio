// @flow

type MaybeIter = {
  sizeHint?: () => number,
}

export default function sizeOf<I: MaybeIter>(iter: I): number {
  if (typeof iter.sizeHint === 'function') {
    return iter.sizeHint()
  }

  return Infinity
}
