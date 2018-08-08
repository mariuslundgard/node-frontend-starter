// @flow

import express from 'express'

const staticMiddleware = express.static

function createServer () {
  const server = express()

  server.disable('x-powered-by')

  return server
}

export { createServer, staticMiddleware }
