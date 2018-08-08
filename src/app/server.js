// @flow @jsx h

import layout from 'layout'
import { encode } from 'mount-utils'
import { h } from 'preact'
import { render } from 'preact-render-to-string'
import { createServer } from 'server'
import style from './main.css'
import Root from './Root'

import type { Request, Response } from 'server'
import type { Config } from '../types'

export function create (config: Config) {
  const { baseUrl, manifest } = config
  const server = createServer()

  function assetUrl (name) {
    return `${baseUrl}/${manifest[name]}`
  }

  server.get('/', async (req: Request, res: Response) => {
    try {
      const props = { title: 'App' }

      res.send(
        layout({
          lang: 'en',
          title: `${props.title} – node-hipster-starter`,
          head: `<link rel="stylesheet" href="${assetUrl('app.css')}">`,
          body: [
            `<div id="${style.root}" data-encoded-props="${encode(props)}">`,
            render(<Root {...props} />),
            '</div>',
            `<script type="module" src="${assetUrl('app.mjs')}"></script>`,
            `<script nomodule src="${assetUrl('app.js')}"></script>`
          ].join('')
        })
      )
    } catch (err) {
      res.status(500)
      res.send(err.stack)
    }
  })

  return server
}
