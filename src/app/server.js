// @flow

/** @jsx h */

import {Router} from 'express'
import layout from 'layout'
import {h} from 'preact'
import {render} from 'preact-render-to-string'
import style from './index.css'
import Root from './Root'

import type {$Request, $Response} from 'express'
import type {Config} from '../types'

export function create (config: Config) {
  const router = Router()

  router.get('/', async (req: $Request, res: $Response) => {
    try {
      res.send(
        layout({
          title: 'App',
          head: `<link rel="stylesheet" href="/${config.manifest['app.css']}">`,
          body: [
            `<div id="${style.root}">${render(<Root />)}</div>`,
            `<script src="/${config.manifest['app.js']}"></script>`
          ].join('')
        })
      )
    } catch (err) {
      res.status(500)
      res.send(err.stack)
    }
  })

  return router
}
