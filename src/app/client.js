/* global __HOT__ */

/** @jsx h */

import {h, render} from 'preact'
import style from './index.css'

const rootElm: any = document.getElementById(style.root)

function renderRoot () {
  const Root = require('./Root').default
  render(<Root />, rootElm, rootElm.firstChild)
}

if (__HOT__) {
  module.hot.accept('./Root', () => {
    renderRoot()
  })
}

renderRoot()
