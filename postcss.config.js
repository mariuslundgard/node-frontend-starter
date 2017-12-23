'use strict'

const postcssCssVariables = require('postcss-css-variables')
const autoprefixer = require('autoprefixer')
const postCssNesting = require('postcss-nesting')

module.exports = {
  plugins: [postCssNesting, postcssCssVariables, autoprefixer]
}
