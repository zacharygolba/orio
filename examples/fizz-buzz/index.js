// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
const ouro = require('ouro-core')

module.exports = function fizzBuzz() {
  return ouro
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
