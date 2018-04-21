// @jsx h

import {h, render} from 'preact'
import style from './client.css'
import Root from './Root'

const rootElm = document.getElementById(style.root)

if (!rootElm) {
  throw new Error(`Could not locate root element #${style.root}`)
}

const encodedProps = rootElm.getAttribute('data-encoded-props')
const props = encodedProps ? JSON.parse(decodeURIComponent(encodedProps)) : {}

render(<Root {...props} />, rootElm, rootElm.firstChild)
