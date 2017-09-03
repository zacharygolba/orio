// @flow

import * as fs from 'fs'

type Directory = Array<string>

export default function readdir(path: string): Promise<Directory> {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (e, children) => {
      if (e == null) {
        resolve(children)
      } else {
        reject(e)
      }
    })
  })
}
