// @flow

import express from 'express'
import supertest from 'supertest'
import * as server from './server'

describe('frame', () => {
  it('should respond with a rendered component', () => {
    const app = express()

    app.use(
      server.create({
        manifest: {
          'frame.js': 'frame.js',
          'frame.css': 'frame.css'
        }
      })
    )

    return supertest(app)
      .get('/')
      .then(res => {
        expect(res.text).toContain('<title>Frame</title>')
        expect(res.text).toContain('<link rel="stylesheet" href="/frame.css">')
        expect(res.text).toContain('<div class="node-hipster-starter-frame"><h1>Frame</h1></div>')
        expect(res.text).toContain('<script src="/frame.js"></script>')
      })
  })
})
