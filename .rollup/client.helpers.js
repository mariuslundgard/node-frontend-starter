'use strict'

const caniuse = require('caniuse-api')
const path = require('path')
const postcssConfig = require('../postcss.config')

// Rollup plugins
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const postcss = require('rollup-plugin-postcss')
const replace = require('rollup-plugin-replace')
const { uglify } = require('rollup-plugin-uglify')

const browsers = {
  nomodule: ['last 2 versions', 'IE 10']
}

function src(filePath) {
  return path.resolve(__dirname, '../src', filePath)
}

function dist(filePath) {
  return path.resolve(__dirname, '../dist', filePath)
}

function getSupport(feature) {
  const result = caniuse.getSupport(feature)

  return result
}

function getBrowserslistForFeatures(features) {
  const lists = features.map(feature => getSupport(feature))

  const keys = new Set(
    lists.map(list => Object.keys(list)).reduce((acc, x) => acc.concat(x), [])
  )

  const result = []

  let key
  for (key of keys) {
    const y = lists.map(list => list[key].y).filter(Boolean)

    if (y.length === lists.length) {
      result.push(`${key} >= ${Math.max(...y)}`)
    }
  }

  return result
}

function createModuleConfig(opts) {
  const babelOpts = {
    presets: [
      [
        'env',
        {
          modules: false,
          targets: {
            browsers: getBrowserslistForFeatures(['es6-module'])
          }
        }
      ]
    ],
    plugins: [
      'external-helpers',
      'transform-class-properties',
      'transform-flow-strip-types',
      'transform-object-rest-spread',
      ['transform-react-jsx', { pragma: 'h' }]
    ]
  }

  return {
    input: opts.js.input,
    output: {
      file: opts.js.output,
      format: 'es',
      sourcemap: true
    },
    plugins: [
      postcss({
        extract: opts.css.output,
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
        browser: true,
        customResolveOptions: {
          paths: process.env.NODE_PATH.split(/[;:]/)
        }
      }),
      babel({
        ...babelOpts,
        babelrc: false,
        exclude: path.resolve(__dirname, '../node_modules/**')
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify(
          process.env.NODE_ENV || 'development'
        ),
        __BASE_URL__: JSON.stringify(opts.baseUrl),
        __INPUT__: JSON.stringify(opts.js.input),
        __OUTPUT__: JSON.stringify(opts.js.output)
      }),
      process.env.NODE_ENV === 'production' && uglify()
    ]
  }
}

function createNomoduleConfig(opts) {
  const babelOpts = {
    presets: [
      [
        'env',
        {
          modules: false,
          targets: {
            browsers: browsers.nomodule
          }
        }
      ]
    ],
    plugins: [
      'external-helpers',
      'transform-class-properties',
      'transform-flow-strip-types',
      'transform-object-rest-spread',
      ['transform-react-jsx', { pragma: 'h' }]
    ]
  }

  return {
    input: opts.js.input,
    output: {
      file: opts.js.output,
      format: 'iife',
      sourcemap: true
    },
    plugins: [
      postcss({
        extract: opts.css.output,
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
        browser: true,
        customResolveOptions: {
          paths: process.env.NODE_PATH.split(/[;:]/)
        }
      }),
      babel({
        ...babelOpts,
        babelrc: false,
        exclude: path.resolve(__dirname, '../node_modules/**')
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify(
          process.env.NODE_ENV || 'development'
        ),
        __BASE_URL__: JSON.stringify(opts.baseUrl),
        __INPUT__: JSON.stringify(opts.js.input),
        __OUTPUT__: JSON.stringify(opts.js.output)
      }),
      process.env.NODE_ENV === 'production' && uglify()
    ]
  }
}

module.exports = { createModuleConfig, createNomoduleConfig, src, dist }
