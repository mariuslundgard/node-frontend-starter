// @flow

import {render as preactRender} from 'preact'

function render (vNode: any, targetElm: any) {
  preactRender(vNode, targetElm, targetElm.firstChild)
}

export {render}
