// @flow

export default async function* range(
  start?: number = 0,
  end?: number = Infinity,
): AsyncIterator<number> {
  for (let next = start; next < end; next += 1) {
    yield next
  }
}
