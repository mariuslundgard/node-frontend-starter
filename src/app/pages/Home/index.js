// @flow

/** @jsx h */

import {Component, h} from 'preact'
import style from './index.css'

class Home extends Component<any> {
  handleLinkClick: Function

  constructor () {
    super()
    this.handleLinkClick = this.handleLinkClick.bind(this)
  }

  handleLinkClick (evt: MouseEvent) {
    evt.preventDefault()

    const target: any = evt.target

    this.props.onNavigate(target.pathname)
  }

  render () {
    return (
      <div key='page' class={style.home}>
        <h1>Home</h1>
        <div>
          <a href='/blog' onClick={this.handleLinkClick}>
            Blog
          </a>
        </div>
        <iframe key='frame' src='/frame' />
      </div>
    )
  }
}

export default Home
