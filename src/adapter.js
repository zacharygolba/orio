/* @flow */

export type Adapter = EnumerateAdapter
                    | FilterAdapter<*>
                    | MapAdapter<*, *>
                    | TakeAdapter
                    | ZipAdapter<*>

export const enumerate = (): EnumerateAdapter =>
  new EnumerateAdapter()

export const filter = <T>(fn: (value: T) => boolean): FilterAdapter<T> =>
  new FilterAdapter(fn)

export const map = <T, U>(fn: (value: T) => U): MapAdapter<T, U> =>
  new MapAdapter(fn)

export const take = (amount: number): TakeAdapter =>
  new TakeAdapter(amount)

export const zip = <T>(source: Iterator<T>): ZipAdapter<T> =>
  new ZipAdapter(source)

class EnumerateAdapter {
  type: 'ENUMERATE'

  constructor() {
    this.type = 'ENUMERATE'
  }
}

class FilterAdapter<T> {
  action: (value: T) => boolean
  type: 'FILTER'

  constructor(action: (value: T) => boolean) {
    Object.assign(this, { action, type: 'FILTER' })
  }
}

class MapAdapter<T, U> {
  action: (value: T) => U
  type = 'MAP'

  constructor(action: (value: T) => U) {
    Object.assign(this, { action, type: 'MAP' })
  }
}

class TakeAdapter {
  amount: number
  type: 'TAKE'

  constructor(amount: number) {
    Object.assign(this, { amount, type: 'TAKE' })
  }
}

class ZipAdapter<T> {
  target: Iterator<T>
  type: 'ZIP'

  constructor(target: Iterator<T>) {
    Object.assign(this, { target, type: 'ZIP' })
  }
}
