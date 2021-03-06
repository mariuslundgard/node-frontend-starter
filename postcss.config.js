'use strict'

const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const postcssCustomProperties = require('postcss-custom-properties')
const postcssImport = require('postcss-import')
const postcssNesting = require('postcss-nesting')

module.exports = {
  plugins: [
    postcssImport({
      root: __dirname,
      path: process.env.NODE_PATH.split(/[;:]/)
    }),
    postcssNesting,
    postcssCustomProperties(),
    autoprefixer,
    process.env.NODE_ENV === 'production' && cssnano
  ].filter(Boolean)
}
