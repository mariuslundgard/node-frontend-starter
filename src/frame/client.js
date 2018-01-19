// @flow

/** @jsx h */

import {h, render} from 'preact'
import Root from './Root'
import style from './index.css'

const rootElm: any = document.getElementById(style.root)

render(<Root />, rootElm, rootElm.firstChild)
