// @flow @jsx h

import {Component, h} from 'preact'
import style from './index.css'

type Props = {
  title: string
}

class Root extends Component<Props> {
  render () {
    const {title} = this.props

    return (
      <div class={style.app}>
        <h1>{title}</h1>
        <iframe key='frame' src='/frame' />
      </div>
    )
  }
}

export default Root
