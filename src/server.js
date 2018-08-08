// @flow

import { createServer, staticMiddleware } from 'server'
import * as app from './app/server'
import * as frame from './frame/server'

import type { Config } from './types'

export function create (config: Config) {
  const server = createServer()

  // Apply middleware
  server.use(staticMiddleware(config.staticPath))
  server.use('/', app.create(config))
  server.use('/frame', frame.create(config))

  return server
}
