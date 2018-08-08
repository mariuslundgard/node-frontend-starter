// @flow

import express from 'express'
import supertest from 'supertest'
import * as server from './server'

describe('frame', () => {
  it('should respond with a rendered component', async () => {
    const app = express()

    app.use(
      server.create({
        baseUrl: '',
        manifest: {
          'frame.css': 'frame.css',
          'frame.js': 'frame.js',
          'frame.mjs': 'frame.mjs'
        },
        staticPath: ''
      })
    )

    const res = await supertest(app).get('/')

    expect(res.text).toContain('<title>Frame – node-hipster-starter</title>')
    expect(res.text).toContain('<link rel="stylesheet" href="/frame.css">')
    expect(res.text).toContain('<div class="node-hipster-starter-frame">')
    expect(res.text).toContain(
      '<script type="module" src="/frame.mjs"></script>'
    )
    expect(res.text).toContain('<script nomodule src="/frame.js"></script>')
  })
})
