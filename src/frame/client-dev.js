import 'preact/devtools/index'
import './client'

const eventSource = new EventSource('/dev')

eventSource.addEventListener('message', evt => {
  const msg = JSON.parse(evt.data)

  switch (msg.code) {
    case 'BUNDLE_END':
      if (msg.input.endsWith('/src/frame/client-dev.js')) {
        window.location.reload()
      }
      break
  }
})
