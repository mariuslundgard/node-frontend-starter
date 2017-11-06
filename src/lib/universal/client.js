// @flow

import type {Route} from './types'

import pathToRegexp from 'path-to-regexp'

type Opts = {
  routes: Route[]
}

export function create (opts: Opts) {
  function matchRoute (path) {
    let match = null

    opts.routes.some(route => {
      const keys = []
      const re = pathToRegexp(route.pattern, keys)
      const result = re.exec(path)

      if (result) {
        match = {route, params: {}}
        match.params = keys.reduce((params, key, idx) => {
          params[key.name] = result[idx + 1]
          return params
        }, match.params)
        return true
      }

      return false
    })

    return match
  }

  function render (path: string) {
    const match = matchRoute(path)

    if (match) {
      match.route
        .handler({method: 'GET', path, params: match.params})
        .then(opts.render || (() => {}))
        .catch(err => {
          throw err
        })
    } else {
      throw new Error(`Not found: ${path}`)
    }
  }

  function open (path: string) {
    window.history.pushState(null, null, path)
    render(path)
  }

  function listen () {
    render(window.location.pathname)
    window.onpopstate = () => {
      render(window.location.pathname)
    }
  }

  return {
    open,
    listen
  }
}
