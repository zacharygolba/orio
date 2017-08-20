// @flow

export function add(lhs: mixed, rhs?: mixed): number {
  return Number(lhs) + Number(rhs)
}

export function imul(lhs: mixed, rhs: mixed = 0): number {
  return Math.imul(Number(lhs), Number(rhs))
}

export function mul(lhs: mixed, rhs: mixed = 0): number {
  return Number(lhs) * Number(rhs)
}
