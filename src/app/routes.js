// @flow

/** @jsx h */

import type {Request} from 'universal/types'
import type {Config} from '../types'

import {get} from 'universal'
import {h} from 'preact'

// Import pages
import Blog from './pages/Blog'
import Home from './pages/Home'

export function create (config: Config, handlers: any) {
  const {manifest} = config

  return [
    get('/', async function (req: Request) {
      return {
        body: <Home {...handlers} />,
        script: `/${manifest['app.js']}`,
        style: `/${manifest['app.css']}`,
        title: 'Home'
      }
    }),
    get('/blog', async function (req: Request) {
      return {
        body: <Blog {...handlers} />,
        script: `/${manifest['app.js']}`,
        style: `/${manifest['app.css']}`,
        title: 'Blog'
      }
    })
  ]
}
