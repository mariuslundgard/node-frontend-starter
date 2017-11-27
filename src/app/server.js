// @flow

/** @jsx h */

import {Router} from 'express'
import layout from 'layout'
import {h} from 'preact'
import {render} from 'preact-render-to-string'
import Root from './Root'

import type {$Request, $Response} from 'express'
import type {Config} from '../types'

export function create (config: Config) {
  const router = Router()

  router.get('/', async (req: $Request, res: $Response) =>
    res.send(
      layout({
        title: 'App',
        head: `<link rel="stylesheet" href="/${config.manifest['app.css']}">`,
        body: `<div id="root">${render(<Root />)}</div><script src="/${config.manifest['app.js']}"></script>`
      })
    )
  )

  return router
}
