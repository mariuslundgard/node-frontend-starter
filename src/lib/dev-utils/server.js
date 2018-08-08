// @flow

import * as rollup from 'rollup'

import type { $Application, $Request, $Response } from 'express'

type HotReloadingOpts = {
  server: $Application,
  rollupConfig: any[]
}

export function setupHotReloading (opts: HotReloadingOpts) {
  const { server } = opts
  const clients = []

  server.get('/dev', (req: $Request, res: $Response) => {
    const file: any = req.query.file

    console.log(`[dev] client connected (file=${file})`)

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    })
    dispatch('INIT', { file })
    clients.push(res)
    req.addListener('close', () => {
      console.log(`[dev] client disconnected (file=${file})`)
      const idx = clients.indexOf(res)
      if (idx > -1) clients.splice(idx, 1)
    })
  })

  // Setup client-side watcher
  const rollupWatcher = rollup.watch(opts.rollupConfig)
  rollupWatcher.on('event', evt => {
    switch (evt.code) {
      case 'FATAL':
        close()
        console.error(evt.error.stack)
        process.exit(1)
      default:
        dispatch('ROLLUP', evt)
        break
    }
  })

  function close () {
    rollupWatcher.close()
  }

  function dispatch (id: string, data: any) {
    clients.forEach(res =>
      res.write(`id: ${id}\ndata: ${JSON.stringify(data)}\n\n`)
    )
  }

  return {
    close,
    dispatch
  }
}
