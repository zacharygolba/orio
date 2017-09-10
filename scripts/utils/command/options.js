// @flow

import Environment from './env'
import type Command from './'

const STORE = new WeakMap()

export type Stdio = 'ignore' | 'inherit' | 'pipe'
export type Options = {
  args: Array<string>,
  cwd: string,
  env: Environment,
  program: string,
  shell: boolean,
  stdio: Array<string>,
}

const defaultValue = () => ({
  args: [],
  cwd: process.cwd(),
  env: new Environment(),
  program: '',
  shell: false,
  stdio: ['pipe', 'pipe', 'inherit'],
})

export default function optionsFor(command: Command): Options {
  let options = STORE.get(command)

  if (options == null) {
    options = defaultValue()
    STORE.set(command, options)
  }

  return options
}
