'use strict'

const autoprefixer = require('autoprefixer')
const postcssImport = require('postcss-import')
const postcssCustomProperties = require('postcss-custom-properties')
const postCssNesting = require('postcss-nesting')

module.exports = {
  plugins: [
    postcssImport,
    postCssNesting,
    postcssCustomProperties(),
    autoprefixer
  ]
}
