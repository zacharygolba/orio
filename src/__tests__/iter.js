// @flow

describe('Combinators', () => {
  jest.resetModules()
  jest.doMock('../adapter')

  /* eslint-disable global-require */

  const iter = require('../')
  const {
    ChainAdapter,
    EnumerateAdapter,
    FilterAdapter,
    FilterMapAdapter,
    FlatMapAdapter,
    MapAdapter,
    SkipWhileAdapter,
    SkipAdapter,
    TakeWhileAdapter,
    TakeAdapter,
    TapAdapter,
    ZipAdapter,
  } = require('../adapter')

  /* eslint-enable global-require */

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('#chain()', () => {
    const source = [4, 5, 6]
    const subj = iter.from([1, 2, 3])

    subj.chain(source)
    expect(ChainAdapter).toHaveBeenLastCalledWith(subj.producer, source)
  })

  test('#enumerate()', () => {
    const subj = iter.range()

    subj.enumerate()
    expect(EnumerateAdapter).toHaveBeenLastCalledWith(subj.producer)
  })

  test('#filter()', () => {
    const subj = iter.range()
    const fn = jest.fn()

    subj.filter(fn)
    expect(FilterAdapter).toHaveBeenLastCalledWith(subj.producer, fn)
  })

  test('#filterMap()', () => {
    const subj = iter.range()
    const fn = jest.fn()

    subj.filterMap(fn)
    expect(FilterMapAdapter).toHaveBeenLastCalledWith(subj.producer, fn)
  })

  test('#flatMap()', () => {
    const subj = iter.range()
    const fn = jest.fn()

    subj.flatMap(fn)
    expect(FlatMapAdapter).toHaveBeenLastCalledWith(subj.producer, fn)
  })

  test('#flatten()', () => {
    const subj = iter.range()

    subj.flatten()
    expect(FlatMapAdapter).toHaveBeenLastCalledWith(
      subj.producer,
      expect.any(Function),
    )
  })

  test('#map()', () => {
    const subj = iter.range()
    const fn = jest.fn()

    subj.map(fn)
    expect(MapAdapter).toHaveBeenLastCalledWith(subj.producer, fn)
  })

  test('#skip()', () => {
    const subj = iter.range()

    subj.skip(3)
    expect(SkipAdapter).toHaveBeenLastCalledWith(subj.producer, 3)
  })

  test('#skipWhile()', () => {
    const subj = iter.range()
    const fn = jest.fn()

    subj.skipWhile(fn)
    expect(SkipWhileAdapter).toHaveBeenLastCalledWith(subj.producer, fn)
  })

  test('#take()', () => {
    const subj = iter.range()

    subj.take(5)
    expect(TakeAdapter).toHaveBeenLastCalledWith(subj.producer, 5)
  })

  test('#takeWhile()', () => {
    const subj = iter.range()
    const fn = jest.fn()

    subj.takeWhile(fn)
    expect(TakeWhileAdapter).toHaveBeenLastCalledWith(subj.producer, fn)
  })

  test('#tap()', () => {
    const subj = iter.range()
    const fn = jest.fn()

    subj.tap(fn)
    expect(TapAdapter).toHaveBeenLastCalledWith(subj.producer, fn)
  })

  test('#zip()', () => {
    {
      const source = iter.range(Infinity, 0)
      const subj = iter.range()

      subj.zip(source)
      expect(ZipAdapter).toHaveBeenLastCalledWith(subj.producer, source)
    }

    {
      const subj = iter.range()

      subj.zip()
      expect(ZipAdapter).toHaveBeenLastCalledWith(subj.producer, subj.producer)
    }
  })
})

describe('Methods', () => {
  jest.dontMock('../adapter')
  jest.resetModules()

  // eslint-disable-next-line global-require
  const iter = require('../')

  test('#@@iterator()', () => {
    const source = [1, 2, 3]

    for (const value of iter.from(source)) {
      expect(source.includes(value)).toBe(true)
    }
  })

  test('#collect()', () => {
    expect(iter.from('test').collect()).toMatchSnapshot()
    expect(iter.from('test').collect(Set)).toMatchSnapshot()
    expect(iter.range(0, 255).collect(Uint8Array)).toMatchSnapshot()
    expect(iter.from('test').enumerate().collect(Map)).toMatchSnapshot()
  })

  test('#count()', () => {
    expect(iter.range(1, 10).count()).toBe(10)
    expect(iter.range(1).count()).toBe(Infinity)
  })

  test('#every()', () => {
    {
      const fn = jest.fn(num => num < 10)

      expect(iter.range(1, 5).every(fn)).toBe(true)
      expect(fn).toHaveBeenCalledTimes(5)
    }

    {
      const fn = jest.fn(num => num > 10)

      expect(iter.range(1, 5).every(fn)).toBe(false)
      expect(fn).toHaveBeenCalledTimes(1)
    }
  })

  test('#find()', () => {
    const fn = jest.fn(char => char === 'c')

    expect(iter.chars('a', 'z').find(fn)).toBe('c')
    expect(fn).toHaveBeenCalledTimes(3)
  })

  test('#first()', () => {
    expect(iter.chars('a', 'z').first()).toBe('a')
  })

  test('#forEach()', () => {
    {
      const source = [1, 2, 3]
      const subj = iter.from(source)
      const fn = jest.fn()

      subj.forEach(fn)
      source.forEach(value => expect(fn).toHaveBeenCalledWith(value))
      expect(fn).toHaveBeenCalledTimes(source.length)
    }

    {
      const subj = iter.range(1, 4)
      const fn = jest.fn()

      subj.filter(num => num % 2 === 0).forEach(fn)
      expect(fn).toHaveBeenCalledWith(2)
      expect(fn).toHaveBeenCalledWith(4)
      expect(fn).toHaveBeenCalledTimes(2)
    }
  })

  test('#join()', () => {
    expect(iter.range(1, 3).join()).toBe('1,2,3')
    expect(iter.range(1, 3).join(' * ')).toBe('1 * 2 * 3')
  })

  test('#last()', () => {
    expect(iter.chars('a', 'z').last()).toBe('z')
  })

  test('#nth()', () => {
    expect(iter.chars('a', 'z').nth(0)).toBe('a')
    expect(iter.chars('a', 'z').nth(1)).toBe('b')
    expect(iter.chars('a', 'z').nth(2)).toBe('c')
    expect(iter.chars('a', 'z').nth(-1)).toBeUndefined()
    expect(iter.chars('a', 'z').nth(27)).toBeUndefined()
  })

  test('#product()', () => {
    expect(iter.from([]).product()).toBe(0)
    expect(iter.range(2, 4).product()).toBe(2 * 3 * 4)
    expect(Number.isNaN(iter.chars('a', 'z').product())).toBe(true)
  })

  test('#reduce()', () => {
    const set = iter.range(1, 3).reduce((acc, next) => acc.add(next), new Set())

    expect(set.size).toBe(3)
    expect(set.has(1)).toBe(true)
    expect(set.has(2)).toBe(true)
    expect(set.has(3)).toBe(true)
  })

  test('#some()', () => {
    {
      const fn = jest.fn(num => num > 2)

      expect(iter.range(1, 5).some(fn)).toBe(true)
      expect(fn).toHaveBeenCalledTimes(3)
    }

    {
      const fn = jest.fn(num => num > 10)

      expect(iter.range(1, 5).some(fn)).toBe(false)
      expect(fn).toHaveBeenCalledTimes(5)
    }
  })

  test('#sum()', () => {
    expect(iter.from([]).sum()).toBe(0)
    expect(iter.range(1, 4).sum()).toBe(1 + 2 + 3 + 4)
    expect(Number.isNaN(iter.chars('a', 'z').sum())).toBe(true)
  })

  test('#toString()', () => {
    expect(iter.from([]).toString()).toBe('[object Iter]')
  })
})
