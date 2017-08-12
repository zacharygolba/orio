// @flow

export default function* range(start?: number = 0, end?: number = Infinity): Iterator<number> {
  for (let next = start; next < end; next += 1) {
    yield next
  }
}
