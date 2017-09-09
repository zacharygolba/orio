// @flow

let timer = setTimeout

if (typeof module !== 'undefined' && module.exports) {
  timer = global.setImmediate
}

export function setImmediate(): Promise<void> {
  return new Promise(resolve => timer(resolve))
}
