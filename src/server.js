// @flow

import express from 'express'
import * as app from './app/server'
import * as frame from './frame/server'

import type { Config } from './types'

export function create (config: Config) {
  const server = express()

  server.use(express.static(config.staticPath))
  server.use('/', app.create(config))
  server.use('/frame', frame.create(config))

  return server
}
