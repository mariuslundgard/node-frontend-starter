// @flow

/** @jsx h */

import type {Request} from 'universal/types'
import type {Config} from '../types'

import {get} from 'universal'
import {h} from 'preact'

export function create (config: Config) {
  const {manifest} = config

  return [
    get('/frame', async function (req: Request) {
      return {
        body: <div>frame: {req.path}</div>,
        script: `/${manifest['frame.js']}`,
        style: `/${manifest['frame.css']}`,
        title: 'frame'
      }
    })
  ]
}
