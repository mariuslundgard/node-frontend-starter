// @flow

import type {Handler} from './types'

export function get (pattern: string, handler: Handler) {
  return {method: 'GET', pattern, handler}
}
