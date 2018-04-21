// @flow @jsx h

import { Component, h } from 'preact'
import style from './index.css'

type Props = {
  title: string
}

class Root extends Component<Props> {
  render () {
    const { title } = this.props

    return (
      <div class={style.frame}>
        <h1>{title}</h1>
      </div>
    )
  }
}

export default Root
