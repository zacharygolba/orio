export default function reduce(fn, init, source) {
  let acc = init

  for (const value of source) {
    acc = fn(acc, value)
  }

  return acc
}
