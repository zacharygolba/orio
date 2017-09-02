// @flow

describe('Combinators', () => {
  jest.resetModules()
  jest.doMock('../adapter')

  /* eslint-disable global-require */

  const ouro = require('../')
  const {
    Chain,
    Enumerate,
    Filter,
    FilterMap,
    FlatMap,
    Map,
    SkipWhile,
    Skip,
    TakeWhile,
    Take,
    Tap,
    Zip,
  } = require('../adapter')

  /* eslint-enable global-require */

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('#chain()', () => {
    const source = [4, 5, 6]
    const subj = ouro.of(1, 2, 3)

    subj.chain(source)
    expect(Chain).toHaveBeenLastCalledWith(subj.producer, source)
  })

  test('#enumerate()', () => {
    const subj = ouro.range()

    subj.enumerate()
    expect(Enumerate).toHaveBeenLastCalledWith(subj.producer)
  })

  test('#filter()', () => {
    const subj = ouro.range()
    const fn = jest.fn()

    subj.filter(fn)
    expect(Filter).toHaveBeenLastCalledWith(subj.producer, fn)
  })

  test('#filterMap()', () => {
    const subj = ouro.range()
    const fn = jest.fn()

    subj.filterMap(fn)
    expect(FilterMap).toHaveBeenLastCalledWith(subj.producer, fn)
  })

  test('#flatMap()', () => {
    const subj = ouro.range()
    const fn = jest.fn()

    subj.flatMap(fn)
    expect(FlatMap).toHaveBeenLastCalledWith(subj.producer, fn)
  })

  test('#flatten()', () => {
    const subj = ouro.range()

    subj.flatten()
    expect(FlatMap).toHaveBeenLastCalledWith(
      subj.producer,
      expect.any(Function),
    )
  })

  test('#map()', () => {
    const subj = ouro.range()
    const fn = jest.fn()

    subj.map(fn)
    expect(Map).toHaveBeenLastCalledWith(subj.producer, fn)
  })

  test('#skip()', () => {
    const subj = ouro.range()

    subj.skip(3)
    expect(Skip).toHaveBeenLastCalledWith(subj.producer, 3)
  })

  test('#skipWhile()', () => {
    const subj = ouro.range()
    const fn = jest.fn()

    subj.skipWhile(fn)
    expect(SkipWhile).toHaveBeenLastCalledWith(subj.producer, fn)
  })

  test('#take()', () => {
    const subj = ouro.range()

    subj.take(5)
    expect(Take).toHaveBeenLastCalledWith(subj.producer, 5)
  })

  test('#takeWhile()', () => {
    const subj = ouro.range()
    const fn = jest.fn()

    subj.takeWhile(fn)
    expect(TakeWhile).toHaveBeenLastCalledWith(subj.producer, fn)
  })

  test('#tap()', () => {
    const subj = ouro.range()
    const fn = jest.fn()

    subj.tap(fn)
    expect(Tap).toHaveBeenLastCalledWith(subj.producer, fn)
  })

  test('#zip()', () => {
    {
      const source = ouro.range(Infinity, 0)
      const subj = ouro.range()

      subj.zip(source)
      expect(Zip).toHaveBeenLastCalledWith(subj.producer, source)
    }

    {
      const subj = ouro.range()

      subj.zip()
      expect(Zip).toHaveBeenLastCalledWith(subj.producer, subj.producer)
    }
  })
})

describe('Methods', () => {
  jest.dontMock('../adapter')
  jest.resetModules()

  // eslint-disable-next-line global-require
  const ouro = require('../')

  test('#@@iterator()', () => {
    const source = [1, 2, 3]

    for (const value of ouro.from(source)) {
      expect(source.includes(value)).toBe(true)
    }
  })

  test('#collect()', () => {
    expect(ouro.from('test').collect()).toMatchSnapshot()
    expect(ouro.from('test').collect(Set)).toMatchSnapshot()
    expect(ouro.range(0, 255).collect(Uint8Array)).toMatchSnapshot()
    expect(
      ouro
        .from('test')
        .enumerate()
        .collect(Map),
    ).toMatchSnapshot()
  })

  test('#count()', () => {
    expect(ouro.range(1, 10).count()).toBe(10)
  })

  test('#every()', () => {
    {
      const fn = jest.fn(num => num < 10)

      expect(ouro.range(1, 5).every(fn)).toBe(true)
      expect(fn).toHaveBeenCalledTimes(5)
    }

    {
      const fn = jest.fn(num => num > 10)

      expect(ouro.range(1, 5).every(fn)).toBe(false)
      expect(fn).toHaveBeenCalledTimes(1)
    }
  })

  test('#find()', () => {
    const fn = jest.fn(char => char === 'c')

    expect(ouro.chars('a', 'z').find(fn)).toBe('c')
    expect(fn).toHaveBeenCalledTimes(3)
  })

  test('#first()', () => {
    expect(ouro.chars('a', 'z').first()).toBe('a')
  })

  test('#forEach()', () => {
    {
      const source = [1, 2, 3]
      const subj = ouro.from(source)
      const fn = jest.fn()

      subj.forEach(fn)
      source.forEach(value => expect(fn).toHaveBeenCalledWith(value))
      expect(fn).toHaveBeenCalledTimes(source.length)
    }

    {
      const subj = ouro.range(1, 4)
      const fn = jest.fn()

      subj.filter(num => num % 2 === 0).forEach(fn)
      expect(fn).toHaveBeenCalledWith(2)
      expect(fn).toHaveBeenCalledWith(4)
      expect(fn).toHaveBeenCalledTimes(2)
    }
  })

  test('#join()', () => {
    expect(ouro.range(1, 3).join()).toBe('1,2,3')
    expect(ouro.range(1, 3).join(' * ')).toBe('1 * 2 * 3')
  })

  test('#last()', () => {
    expect(ouro.chars('a', 'z').last()).toBe('z')
  })

  test('#nth()', () => {
    expect(ouro.chars('a', 'z').nth(0)).toBe('a')
    expect(ouro.chars('a', 'z').nth(1)).toBe('b')
    expect(ouro.chars('a', 'z').nth(2)).toBe('c')
    expect(ouro.chars('a', 'z').nth(-1)).toBeUndefined()
    expect(ouro.chars('a', 'z').nth(27)).toBeUndefined()
  })

  test('#product()', () => {
    expect(ouro.of().product()).toBe(0)
    expect(ouro.range(2, 4).product()).toBe(2 * 3 * 4)
    expect(Number.isNaN(ouro.chars('a', 'z').product())).toBe(true)
  })

  test('#reduce()', () => {
    const set = ouro.range(1, 3).reduce((acc, next) => acc.add(next), new Set())

    expect(set.size).toBe(3)
    expect(set.has(1)).toBe(true)
    expect(set.has(2)).toBe(true)
    expect(set.has(3)).toBe(true)
  })

  test('#some()', () => {
    {
      const fn = jest.fn(num => num > 2)

      expect(ouro.range(1, 5).some(fn)).toBe(true)
      expect(fn).toHaveBeenCalledTimes(3)
    }

    {
      const fn = jest.fn(num => num > 10)

      expect(ouro.range(1, 5).some(fn)).toBe(false)
      expect(fn).toHaveBeenCalledTimes(5)
    }
  })

  test('#sum()', () => {
    expect(ouro.of().sum()).toBe(0)
    expect(ouro.range(1, 4).sum()).toBe(1 + 2 + 3 + 4)
    expect(Number.isNaN(ouro.chars('a', 'z').sum())).toBe(true)
  })

  test('#toString()', () => {
    expect(ouro.of().toString()).toBe('[object Ouro]')
  })
})
