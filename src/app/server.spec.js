// @flow

import express from 'express'
import supertest from 'supertest'
import * as server from './server'

describe('app', () => {
  it('should respond with a rendered component', async () => {
    const app = express()

    app.use(
      server.create({
        baseUrl: '',
        manifest: {
          'app.css': 'app.css',
          'app.js': 'app.js',
          'app.mjs': 'app.mjs'
        },
        staticPath: ''
      })
    )

    const res = await supertest(app).get('/')

    expect(res.text).toContain('<title>App – node-hipster-starter</title>')
    expect(res.text).toContain('<link rel="stylesheet" href="/app.css">')
    expect(res.text).toContain('<div class="node-hipster-starter-app">')
    expect(res.text).toContain('<script type="module" src="/app.mjs"></script>')
    expect(res.text).toContain('<script nomodule src="/app.js"></script>')
  })
})
