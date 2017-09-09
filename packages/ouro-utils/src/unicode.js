// @flow

type Source = Uint16Array | Uint8Array | Buffer | string

export function decodeUtf16(source: Source): string {
  if (typeof source === 'string') {
    return source
  }

  return String.fromCharCode(...source)
}

export function encodeUtf16(source: Source): Uint16Array {
  if (source instanceof Uint16Array || source instanceof Uint8Array) {
    return new Uint16Array(source)
  }

  const { length } = source
  const buf = new Uint16Array(length).fill(0)

  for (let i = 0; i < length; i += 1) {
    buf[i] = source.charCodeAt(i)
  }

  return buf
}

export function decodeUtf8(source: Source): string {
  if (typeof source === 'string') {
    return decodeURIComponent(escape(source))
  }

  return decodeUtf8(String.fromCharCode(...source))
}

export function encodeUtf8(source: Source): Uint8Array {
  if (source instanceof Uint8Array) {
    return new Uint8Array(source)
  }

  if (source instanceof Uint16Array) {
    return encodeUtf8(decodeUtf16(source))
  }

  const utf8Source = unescape(encodeURIComponent(source))
  const { length } = utf8Source
  const buf = new Uint8Array(length).fill(0)

  for (let i = 0; i < length; i += 1) {
    buf[i] = utf8Source.charCodeAt(i)
  }

  return buf
}
