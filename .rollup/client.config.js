'use strict'

const path = require('path')
const postcssConfig = require('../postcss.config')

// Rollup plugins
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const postcss = require('rollup-plugin-postcss')
const replace = require('rollup-plugin-replace')
const uglify = require('rollup-plugin-uglify')

const babelOpts = {
  presets: [
    [
      'env',
      {
        modules: false,
        targets: {
          browsers: ['last 2 versions', 'IE 10']
        }
      }
    ]
  ],
  plugins: [
    'external-helpers',
    'transform-class-properties',
    'transform-flow-strip-types',
    'transform-object-rest-spread',
    ['transform-react-jsx', {pragma: 'h'}]
  ]
}

const appEntry = {
  input:
    process.env.NODE_ENV === 'production'
      ? path.resolve(__dirname, '../src/app/client.js')
      : path.resolve(__dirname, '../src/app/client-dev.js'),
  output: {
    file: path.resolve(__dirname, '../dist/client/app.js'),
    format: 'iife',
    sourcemap: true
  },
  // external: ['preact/devtools/index'],
  plugins: [
    postcss({
      extract: path.resolve(__dirname, '../dist/client/app.css'),
      extensions: ['.css'],
      modules: {
        generateScopedName: 'node-hipster-starter-[local]'
      },
      plugins: postcssConfig.plugins,
      sourceMap: true
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true
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
    process.env.NODE_ENV === 'production' && uglify()
  ]
}

const frameEntry = {
  input:
    process.env.NODE_ENV === 'production'
      ? path.resolve(__dirname, '../src/frame/client.js')
      : path.resolve(__dirname, '../src/frame/client-dev.js'),
  output: {
    file: path.resolve(__dirname, '../dist/client/frame.js'),
    format: 'iife',
    sourcemap: true
  },
  // external: ['preact/devtools/index'],
  plugins: [
    postcss({
      extract: path.resolve(__dirname, '../dist/client/frame.css'),
      extensions: ['.css'],
      modules: {
        generateScopedName: 'node-hipster-starter-[local]'
      },
      plugins: postcssConfig.plugins,
      sourceMap: true
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true
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
    process.env.NODE_ENV === 'production' && uglify()
  ]
}

module.exports = [appEntry, frameEntry]
