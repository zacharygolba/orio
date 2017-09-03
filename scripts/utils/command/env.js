// @flow

type Env = { [key: string]: string }

export default class Environment extends Map<string, *> {
  constructor() {
    super(Object.entries(process.env))
  }

  toObject(): Env {
    return [...this].reduce((e, [k, v]) => Object.assign(e, { [k]: v }), {})
  }
}
