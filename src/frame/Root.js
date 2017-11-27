// @flow

/** @jsx h */

import {Component, h} from 'preact'
import style from './index.css'

class Root extends Component<any> {
  render () {
    return (
      <div class={style.frame}>
        <h1>Frame</h1>
      </div>
    )
  }
}

export default Root
