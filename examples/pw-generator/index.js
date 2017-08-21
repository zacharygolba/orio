const { EOL } = require('os')

const iter = require('iter.js')
const yargs = require('yargs')

const { version } = require('./package.json')

const { argv } = yargs
  .version(version)
  .alias('l', 'length')
  .coerce('l', Number)
  .default('l', '48', 'sets the length desired password length')
  .alias('p', 'pattern')
  .coerce('p', RegExp)
  .default('p', '[0-9A-Za-z]', 'filter characters with a regular expression')
  .help('help')

iter
  // create an inifinitely repeating iterator of all valid chars [0-9A-Za-z]
  .cycle(
    iter.from()
      .chain(iter.chars('0', '9'))
      .chain(iter.chars('A', 'Z'))
      .chain(iter.chars('a', 'z'))
      .collect()
  )
  // filter chars that don't match the input pattern (default: [0-9A-Za-z])
  .filter(char => argv.pattern.test(char))
  // filter by a random boolean for increased randomness
  .filter(() => Math.floor(Math.random() * 7) === 3)
  // take n number of values from this iterator (default: 48)
  .take(argv.length)
  // append a line ending to this sequence
  .chain(EOL)
  // append a line ending to this sequence
  .forEach(char => process.stdout.write(char))
