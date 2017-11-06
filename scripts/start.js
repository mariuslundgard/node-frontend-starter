'use strict'

const compression = require('compression')
const express = require('express')
const path = require('path')

const config = {
  manifest: require('../build/client/manifest.json'),
  port: 3000
}

// Setup HTTP server
const app = express()
app.use(compression())
app.use(express.static(path.resolve(__dirname, '../build/client')))
app.use((req, res, next) => {
  require('../build/server').create(config)(req, res, next)
})

// Start HTTP server
const server = app.listen(config.port, err => {
  if (err) {
    console.log(err)
    process.exit(1)
  } else {
    const host = server.address().address
    console.log(`Listening at http://${host}:${config.port}`)
  }
})

// Log uncaught exceptions and rejections
process.on('uncaughtException', err => {
  console.error(`Uncaught exception occured: ${err}`)
})
process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled rejection occured:', p, 'reason:', reason)
})
