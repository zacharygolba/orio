export default async function reduce(fn, init, source) {
  let acc = init

  for await (const value of source) {
    acc = await fn(acc, value)
  }

  return acc
}
