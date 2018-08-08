// @flow

import express from 'express'

import type {
  $Application as Server,
  $Request as Request,
  $Response as Response
} from 'express'

export type { Request, Response, Server }

const staticMiddleware = express.static

function createServer () {
  const server = express()

  server.disable('x-powered-by')

  return server
}

export { createServer, staticMiddleware }
