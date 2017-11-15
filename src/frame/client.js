// @flow

/** @jsx h */

import {h, render} from 'preact'
import Root from './Root'
import './index.css'

const rootElm: any = document.getElementById('root')

render(<Root />, rootElm, rootElm.firstChild)
