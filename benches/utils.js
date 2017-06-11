/* @flow */

import Ora from 'ora'
import Table from 'cli-table'
import type { Suite } from 'benchmark'

const LINE_BREAK = new Buffer([10])
const SPINNERS: WeakMap<Suite, Ora> = new WeakMap()

export const println = (value?: string | Buffer = ''): boolean =>
  process.stdout.write(Buffer.concat([
    Buffer.from(value),
    LINE_BREAK,
  ]))

export const handleCycle = ({ target }: Object): void => {
  println(String(target))
}

const stopSpinner = (key: Suite): void => {
  const spinner = SPINNERS.get(key)

  if (spinner) {
    SPINNERS.delete(this)
    spinner.stop()
  }
}

export function handleStart(): void {
  println()

  const spinner = new Ora({
    text: `Running Micro Benchmark: ${this.name}`,
    spinner: 'dots'
  })

  SPINNERS.set(this, spinner)
  spinner.start()
}

export function handleComplete(): void {
  const table = new Table({
    head: [
      'Library',
      'Cycle Time (ms)',
      'Elapsed Time (s)',
    ],
  })

  stopSpinner(this)
  println(`${this.name} Results:`)

  this.sort().forEach(lib => {
    table.push([
      String(lib),
      lib.times.cycle / 1000,
      lib.times.elapsed,
    ])
  })

  println(table.toString())
}
