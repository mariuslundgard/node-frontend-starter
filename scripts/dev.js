'use strict'

const chokidar = require('chokidar')
const express = require('express')
const path = require('path')
const clientConfig = require('../.rollup/client.config')

const sourcePath = path.resolve(__dirname, '../src')
const serverPath = path.resolve(__dirname, '../src/server')
const staticPath = path.resolve(__dirname, '../dist/client')

require('babel-register')({
  only: sourcePath
})

const { setupHotReloading } = require('dev-utils/server')

const config = {
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
const app = express()

// Setup client-side hot reloading
const devServer = setupHotReloading({ app, rollupConfig: clientConfig })

// Connect application
app.use((req, res, next) => require(serverPath).create(config)(req, res, next))

// Start HTTP server
app.listen(port, err => {
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
