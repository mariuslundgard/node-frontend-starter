'use strict'

const postcssImport = require('postcss-import')
const postcssCustomProperties = require('postcss-custom-properties')
const autoprefixer = require('autoprefixer')
const postCssNesting = require('postcss-nesting')

module.exports = {
  plugins: [
    postcssImport,
    postCssNesting,
    postcssCustomProperties(),
    autoprefixer
  ]
}
