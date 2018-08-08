// @flow

export function encode (obj: any) {
  return encodeURIComponent(JSON.stringify(obj))
}

export function decode (str: string) {
  return JSON.parse(decodeURIComponent(str))
}

export function getAndRemoveAttribute (el: HTMLElement, attrName: string) {
  const val = el.getAttribute(attrName)

  el.removeAttribute(attrName)

  return val
}
