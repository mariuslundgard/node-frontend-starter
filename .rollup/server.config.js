'use strict'

const path = require('path')
const postcssConfig = require('../postcss.config')

// Rollup plugins
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const postcss = require('rollup-plugin-postcss')
const replace = require('rollup-plugin-replace')
const { terser } = require('rollup-plugin-terser')

const babelOpts = {
  presets: [
    [
      'env',
      {
        modules: false,
        targets: {
          node: '10.8'
        }
      }
    ]
  ],
  plugins: [
    'transform-class-properties',
    'transform-flow-strip-types',
    'transform-object-rest-spread',
    ['transform-react-jsx', { pragma: 'h' }],
    [
      'css-modules-transform',
      {
        generateScopedName: 'node-hipster-starter-[local]',
        extensions: ['.css']
      }
    ]
  ]
}

module.exports = {
  input: path.resolve(__dirname, '../src/server.js'),
  output: {
    file: path.resolve(__dirname, '../dist/server/index.js'),
    format: 'cjs',
    sourcemap: true
  },
  external: ['express'],
  plugins: [
    postcss({
      extract: false
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
      customResolveOptions: {
        paths: process.env.NODE_PATH.split(/[;:]/)
      }
    }),
    babel({
      ...babelOpts,
      babelrc: false,
      // only transpile source code
      exclude: path.resolve(__dirname, '../node_modules/**')
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      )
    }),
    process.env.NODE_ENV === 'production' && terser()
  ]
}
