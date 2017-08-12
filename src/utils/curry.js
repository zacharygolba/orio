// @flow

// eslint-disable-next-line no-unused-vars
type Curried<X, Y, Z, F: (X, Y) => Z> = X => Y => Z
type Curry<F: (*, *) => *> = Curried<*, *, *, F>

const curry = <F: (*, *) => *>(fn: F): Curry<F> => x => y => fn(x, y)
export default curry
