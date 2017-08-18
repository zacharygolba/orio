import { CollectionIterator, IndexedIterator, UnboundedIterator } from '../iterator'

export default function intoIter(source) {
  if (Array.isArray(source) || typeof source === 'string') {
    return new IndexedIterator(source)
  }

  if (source instanceof Map || source instanceof Set) {
    return new CollectionIterator(source)
  }

  if (source && typeof source[Symbol.iterator] === 'function') {
    return new UnboundedIterator(source)
  }

  if (source === null || source === undefined) {
    return new IndexedIterator(new Array(0))
  }

  return new IndexedIterator(new Array(1).fill(source))
}
