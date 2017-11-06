// @flow

import type {Config} from './types'

import {create as createServer} from 'universal/server'
import {render} from 'preact-render-to-string'
import * as app from './app/routes'
import * as frame from './frame/routes'

function logger (req, res, next) {
  console.log(req.method, req.path)
  next()
}

export function create (config: Config) {
  const handlers = {
    onNavigate (path) {
      console.log('TODO navigate on server', path)
    }
  }

  return createServer({
    middleware: [logger],
    render (res: any) {
      return [
        '<!DOCTYPE html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
        `<title>${res.title}</title>`,
        `<link rel="stylesheet" href="${res.style}">`,
        '</head>',
        '<body>',
        `<div id="root">${render(res.body)}</div>`,
        `<script src="${res.script}"></script>`,
        '</body>',
        '</html>'
      ].join('')
    },
    routes: [...frame.create(config), ...app.create(config, handlers)]
  })
}
