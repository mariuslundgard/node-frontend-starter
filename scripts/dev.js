// @flow

import chokidar from 'chokidar'
import { setupHotReloading } from 'dev-utils/server'
import path from 'path'
import { createServer } from 'server'
import clientConfig from '../.rollup/client.config'

import type { Request, Response } from 'server'
import type { Config } from '../src/types'

const sourcePath = path.resolve(__dirname, '../src')
const serverPath = path.resolve(__dirname, '../src/server')
const staticPath = path.resolve(__dirname, '../dist/client')

const config: Config = {
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  manifest: {
    'app.css': 'app.css',
    'app.js': 'app.js',
    'app.mjs': 'app.mjs',
    'frame.css': 'frame.css',
    'frame.js': 'frame.js',
    'frame.mjs': 'frame.mjs'
  },
  staticPath
}

const port = 3000

// Setup HTTP server
const server = createServer()

// Setup client-side hot reloading
const devServer = setupHotReloading({ server, rollupConfig: clientConfig })

// Connect application
server.use((req: Request, res: Response, next) =>
  require(serverPath).create(config)(req, res, next)
)

// Start HTTP server
server.listen(port, err => {
  if (err) {
    // stop watching
    devServer.close()
    console.error(err)
    process.exit(1)
  } else {
    console.log('┌──────────────────────────────────────────────────┐')
    console.log(`│ The server is listening at http://localhost:${port} │`)
    console.log('└──────────────────────────────────────────────────┘\n')
  }
})

// Setup server-side watcher
const watcher = chokidar.watch(sourcePath)
watcher.on('ready', () => {
  watcher.on('all', () => {
    Object.keys(require.cache)
      .filter(key => key.startsWith(sourcePath))
      .forEach(key => delete require.cache[key])
  })
})

// Log uncaught exceptions and rejections
process.on('uncaughtException', err => {
  console.error(`Uncaught exception occured: ${err}`)
  process.exit(1)
})
process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled rejection occured:', p, 'reason:', reason)
  process.exit(1)
})
