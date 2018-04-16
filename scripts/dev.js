'use strict'

const chokidar = require('chokidar')
const express = require('express')
const path = require('path')
const rollup = require('rollup')
const clientConfig = require('../.rollup/client.config')

const sourcePath = path.resolve(__dirname, '../src')
const serverPath = path.resolve(sourcePath, 'server')

require('babel-register')({
  only: sourcePath
})

const config = {
  manifest: {
    'app.css': 'app.css',
    'app.js': 'app.js',
    'frame.js': 'frame.js',
    'frame.css': 'frame.css'
  }
}

const port = 3000

// Setup client-side watcher
const rollupWatcher = rollup.watch(clientConfig)
rollupWatcher.on('event', evt => {
  switch (evt.code) {
    case 'FATAL':
      console.error(evt.error.stack)
      process.exit(1)

    default:
      clients.forEach(res => {
        res.write(`data: ${JSON.stringify(evt)}\n\n`)
      })
      break
  }
})

// Setup server-side watcher
const watcher = chokidar.watch(sourcePath)
watcher.on('ready', () => {
  watcher.on('all', () => {
    Object.keys(require.cache)
      .filter(key => key.startsWith(sourcePath))
      .forEach(key => {
        delete require.cache[key]
      })
  })
})

// Setup HTTP server
const app = express()

const clients = []
app.get('/dev', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  })

  clients.push(res)

  req.addListener('close', () => {
    clients.splice(clients.indexOf(res), 1)
  })
})

app.use(express.static(path.resolve(__dirname, '../dist/client')))

app.use((req, res, next) => {
  require(serverPath).create(config)(req, res, next)
})

// Start HTTP server
app.listen(port, err => {
  if (err) {
    // stop watching
    rollupWatcher.close()
    console.log(err)
    process.exit(1)
  } else {
    console.log('┌──────────────────────────────────────────────────┐')
    console.log(`│ The server is listening at http://localhost:${port} │`)
    console.log('└──────────────────────────────────────────────────┘\n')
  }
})
