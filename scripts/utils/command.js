// @flow

import { spawn } from 'child_process'

type Env = { [key: string]: string }
type Stdio = 'ignore' | 'inherit' | 'pipe'

class Environment extends Map<string, *> {
  constructor() {
    super(Object.entries(process.env))
  }

  toObject(): Env {
    return [...this].reduce((e, [k, v]) => Object.assign(e, { [k]: v }), {})
  }
}

class Command {
  args: Array<string>
  dir: string
  environment: Environment
  program: string
  shell: boolean
  stdio: Array<string>

  constructor(program: string) {
    this.args = []
    this.dir = process.cwd()
    this.environment = new Environment()
    this.program = program
    this.shell = false
    this.stdio = ['pipe', 'pipe', 'pipe']
  }

  arg(...values: Array<string>): Command {
    this.args.push(...values)
    return this
  }

  cwd(value: string): Command {
    this.dir = value
    return this
  }

  env(key: string, value: string): Command {
    this.environment.set(key, value)
    return this
  }

  exec(): Promise<number> {
    const child = spawn(this.program, this.args, {
      cwd: this.dir,
      env: this.environment.toObject(),
      shell: this.shell,
      stdio: this.stdio,
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

  stderr(stderr: Stdio): Command {
    const { stdio: [stdin, stdout] } = this

    this.stdio = [stdin, stdout, stderr]
    return this
  }

  stdin(stdin: Stdio): Command {
    const { stdio: [, stdout, stderr] } = this

    this.stdio = [stdin, stdout, stderr]
    return this
  }

  stdout(stdout: Stdio): Command {
    const { stdio: [stdin, , stderr] } = this

    this.stdio = [stdin, stdout, stderr]
    return this
  }
}

export default function command(program: string): Command {
  return new Command(program)
}
