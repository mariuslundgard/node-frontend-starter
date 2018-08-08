// @flow

declare var __BASE_URL__
declare var __INPUT__

const es = new window.EventSource(`${__BASE_URL__}/dev?file=${__INPUT__}`)

es.addEventListener('message', evt => {
  const msg = JSON.parse(evt.data)

  switch (evt.lastEventId === 'ROLLUP' && msg.code) {
    case 'BUNDLE_END':
      if (msg.input === __INPUT__) {
        console.log(`[dev] reloading (file=${__INPUT__})`)
        replaceElements('script[src*="localhost"]')
        replaceElements('link[href*="localhost"]')
      }
      break
  }
})

console.log('[dev] hot-reloading enabled')

function replaceElements (selector: string) {
  const els = [...document.querySelectorAll(selector)]

  els.forEach(el => {
    const newEl = document.createElement(el.localName)

    for (const attr of el.attributes) {
      newEl.setAttribute(attr.name, attr.value)
    }

    if (el.parentNode) {
      el.parentNode.replaceChild(newEl, el)
    }
  })
}
