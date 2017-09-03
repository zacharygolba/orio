// @flow

import { spawn } from 'child_process'

import optionsFor from './options'
import type { Stdio } from './options'

class Command {
  constructor(program: string) {
    optionsFor(this).program = program
  }

  arg(...values: Array<string>): Command {
    optionsFor(this).args.push(...values)
    return this
  }

  cwd(value: string): Command {
    optionsFor(this).cwd = value
    return this
  }

  env(key: string, value: string): Command {
    optionsFor(this).env.set(key, value)
    return this
  }

  exec(): Promise<number> {
    const options = optionsFor(this)
    const child = spawn(options.program, options.args, {
      cwd: options.cwd,
      env: options.env.toObject(),
      shell: options.shell,
      stdio: options.stdio,
    })

    return new Promise((resolve, reject) => {
      child.once('error', e => {
        child.removeAllListeners()
        reject(e)
      })

      child.once('close', code => {
        child.removeAllListeners()
        if (code === 0) {
          resolve(code)
        } else {
          reject(new Error(`Process exited with non-zero exit code ${code}`))
        }
      })
    })
  }

  shell(value?: boolean = true): Command {
    optionsFor(this).shell = value
    return this
  }

  stderr(stderr: Stdio): Command {
    const options = optionsFor(this)
    const { stdio: [stdin, stdout] } = options

    options.stdio = [stdin, stdout, stderr]
    return this
  }

  stdin(stdin: Stdio): Command {
    const options = optionsFor(this)
    const { stdio: [, stdout, stderr] } = options

    options.stdio = [stdin, stdout, stderr]
    return this
  }

  stdout(stdout: Stdio): Command {
    const options = optionsFor(this)
    const { stdio: [stdin, , stderr] } = options

    options.stdio = [stdin, stdout, stderr]
    return this
  }
}

export default function command(program: string): Command {
  return new Command(program)
}
