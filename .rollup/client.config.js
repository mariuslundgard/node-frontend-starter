'use strict'

const path = require('path')
const {
  createModuleConfig,
  createNomoduleConfig,
  src,
  dist
} = require('./client.helpers')

const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
const isProd = process.env.NODE_ENV === 'production'

module.exports = [
  // app.mjs
  createModuleConfig({
    baseUrl,
    js: {
      input: isProd ? src('app/client/main.js') : src('app/client/main-dev.js'),
      output: dist('client/app.mjs')
    },
    css: {
      output: dist('client/app.css')
    }
  }),
  // app.js
  createNomoduleConfig({
    baseUrl,
    js: {
      input: isProd
        ? src('app/client/main-legacy.js')
        : src('app/client/main-legacy-dev.js'),
      output: dist('client/app.js')
    },
    css: {
      output: dist('client/app.css')
    }
  }),
  // frame.mjs
  createModuleConfig({
    baseUrl,
    js: {
      input: isProd
        ? src('frame/client/main.js')
        : src('frame/client/main-dev.js'),
      output: dist('client/frame.mjs')
    },
    css: {
      output: dist('client/frame.css')
    }
  }),
  // frame.js
  createNomoduleConfig({
    baseUrl,
    js: {
      input: isProd
        ? src('frame/client/main-legacy.js')
        : src('frame/client/main-legacy-dev.js'),
      output: dist('client/frame.js')
    },
    css: {
      output: dist('client/frame.css')
    }
  })
]
