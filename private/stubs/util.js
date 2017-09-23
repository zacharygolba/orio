// @flow

export function promisify(): () => Promise<void> {
  return () => Promise.resolve()
}
