// @flow

import * as orio from 'orio'

export default function fizzBuzz(): Array<string> {
  return orio
    .range(1, 100)
    .map(n => {
      if (n % 15 === 0) {
        return 'FizzBuzz'
      } else if (n % 5 === 0) {
        return 'Buzz'
      } else if (n % 3 === 0) {
        return 'Fizz'
      }
      return n.toString()
    })
    .collect()
}
