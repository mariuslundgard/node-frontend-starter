// @flow

import type {Route} from './types'

import express from 'express'

type Middleware = (req: any, res: any, next: Function) => void

type Opts = {
  middleware?: Middleware[],
  render?: (res: any) => any,
  routes?: Route[]
}

export function create (opts: Opts = {}) {
  const server = express()
  const render = opts.render || (res => res.body)

  // Setup middleware
  if (opts.middleware) {
    opts.middleware.forEach(middleware => {
      server.use(middleware)
    })
  }

  // Setup routes
  if (opts.routes) {
    opts.routes.forEach(route => {
      switch (route.method.toLowerCase()) {
        case 'post':
          server.post(route.pattern, (req, res) => {
            route
              .handler(req)
              .then(_res => {
                res.status(_res.status || 200)
                res.send(render(_res))
              })
              .catch(err => {
                throw err
              })
          })
          break

        default:
          server.get(route.pattern, (req, res) => {
            route
              .handler(req)
              .then(_res => {
                res.status(_res.status || 200)
                res.send(render(_res))
              })
              .catch(err => {
                throw err
              })
          })
          break
      }
    })
  }

  return server
}
