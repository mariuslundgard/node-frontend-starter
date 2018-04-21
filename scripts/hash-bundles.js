'use strict'

const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const clientPath = path.resolve(__dirname, '../dist/client')
const files = fs.readdirSync(clientPath).map(filename => {
  return path.parse(path.resolve(clientPath, filename))
})

const cssFiles = files.filter(file => file.ext === '.css')
const cssMapFiles = files.filter(file => file.base.endsWith('.css.map'))

const jsFiles = files.filter(file => file.ext === '.js')
const jsMapFiles = files.filter(file => file.base.endsWith('.js.map'))

const manifest = {}

cssFiles.forEach(cssFile => {
  const filePath = path.join(cssFile.dir, cssFile.base)
  const fileContents = fs.readFileSync(filePath).toString()
  const hash = crypto
    .createHash('md5')
    .update(fileContents)
    .digest('hex')
  const targetPath = path.join(cssFile.dir, `${cssFile.name}-${hash}.css`)

  manifest[cssFile.base] = `${cssFile.name}-${hash}.css`

  fs.renameSync(filePath, targetPath)

  const mapFile = cssMapFiles.find(
    cssMapFile => cssMapFile.base === `${cssFile.name}.css.map`
  )

  if (mapFile) {
    fs.writeFileSync(
      targetPath,
      fileContents.replace(
        `/*# sourceMappingURL=${mapFile.base} */`,
        `/*# sourceMappingURL=${cssFile.name}-${hash}.css.map */`
      )
    )

    fs.renameSync(
      path.join(mapFile.dir, mapFile.base),
      path.join(mapFile.dir, `${cssFile.name}-${hash}.css.map`)
    )

    manifest[mapFile.base] = `${cssFile.name}-${hash}.css.map`
  }
})

jsFiles.forEach(jsFile => {
  const filePath = path.join(jsFile.dir, jsFile.base)
  const fileContents = fs.readFileSync(filePath).toString()
  const hash = crypto
    .createHash('md5')
    .update(fileContents)
    .digest('hex')
  const targetPath = path.join(jsFile.dir, `${jsFile.name}-${hash}.js`)

  manifest[jsFile.base] = `${jsFile.name}-${hash}.js`

  fs.renameSync(filePath, targetPath)

  const mapFile = jsMapFiles.find(
    jsMapFile => jsMapFile.base === `${jsFile.name}.js.map`
  )

  if (mapFile) {
    fs.writeFileSync(
      targetPath,
      fileContents.replace(
        `//# sourceMappingURL=${mapFile.base}`,
        `//# sourceMappingURL=${jsFile.name}-${hash}.js.map`
      )
    )

    fs.renameSync(
      path.join(mapFile.dir, mapFile.base),
      path.join(mapFile.dir, `${jsFile.name}-${hash}.js.map`)
    )

    manifest[mapFile.base] = `${jsFile.name}-${hash}.js.map`
  }
})

fs.writeFileSync(
  path.resolve(__dirname, '../dist/client/manifest.json'),
  JSON.stringify(manifest, null, 2) + '\n'
)
