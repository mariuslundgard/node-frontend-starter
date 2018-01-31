/* global __DEV__ */

/** @jsx h */

import {h, render} from 'preact'
import style from './index.css'

if (__DEV__) {
  require('preact/devtools')
}

const rootElm = document.getElementById(style.root)

if (!rootElm) {
  throw new Error(`Could not locate root element #${style.root}`)
}

function renderRoot () {
  const Root = require('./Root').default
  render(<Root />, rootElm, rootElm.firstChild)
}

if (__DEV__) {
  module.hot.accept('./Root', () => {
    renderRoot()
  })
}

renderRoot()
