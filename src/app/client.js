// @flow

/** @jsx createElement */

import {createElement} from 'vdom'
import {render} from 'vdom/client'
import Root from './Root'
import './index.css'

const rootElm: any = document.getElementById('root')

render(<Root />, rootElm)
