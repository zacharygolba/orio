// @flow

import * as fs from 'fs'
import * as path from 'path'

const PATH = path.join(__dirname, '..', 'emoji.json')
const EMOJI = JSON.parse(fs.readFileSync(PATH, 'utf8'))

export default (EMOJI: Array<string>)
