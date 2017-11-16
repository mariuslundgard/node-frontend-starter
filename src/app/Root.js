// @flow

/** @jsx createElement */

import {Component, createElement} from 'vdom'
import style from './index.css'

class Root extends Component<any> {
  render () {
    return (
      <div class={style.app}>
        <h1>App</h1>
        <iframe key='frame' src='/frame' />
      </div>
    )
  }
}

export default Root
