// @flow @jsx h

import { decode, getAndRemoveAttribute } from 'mount-utils'
import { h, render } from 'preact'
import style from '../main.css'
import Root from '../Root'

const rootElm = document.getElementById(style.root)

if (!rootElm) {
  throw new Error(`Could not locate root element #${style.root}`)
}

const encodedProps = getAndRemoveAttribute(rootElm, 'data-encoded-props')
const props = encodedProps ? decode(encodedProps) : {}

render(<Root {...props} />, rootElm, rootElm.firstElementChild || undefined)
