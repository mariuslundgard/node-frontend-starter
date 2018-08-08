'use strict'

const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const extensions = ['.css', '.js', '.mjs']
const clientPath = path.resolve(__dirname, '../dist/client')
const files = fs.readdirSync(clientPath).map(filename => {
  return path.parse(path.resolve(clientPath, filename))
})

const transformFiles = files.filter(file => extensions.indexOf(file.ext) > -1)

const manifest = {}

transformFiles.forEach(transform)

fs.writeFileSync(
  path.resolve(clientPath, 'manifest.json'),
  JSON.stringify(manifest, null, 2) + '\n'
)

function transform (file) {
  const { ext } = file
  const filePath = path.join(file.dir, file.base)
  const fileContents = fs.readFileSync(filePath).toString()
  const hash = crypto
    .createHash('md5')
    .update(fileContents)
    .digest('hex')
  const targetPath = path.join(file.dir, `${file.name}-${hash}${ext}`)
  const targetBase = `${file.name}-${hash}${ext}`

  manifest[file.base] = targetBase

  console.log('transform file:', file.base, '→', targetBase)

  fs.renameSync(filePath, targetPath)

  const mapFile = files.find(f => f.base === `${file.base}.map`)

  if (mapFile) {
    console.log('transform file:', mapFile.base, '→', `${targetBase}.map`)

    fs.writeFileSync(
      targetPath,
      fileContents
        .replace(
          `/*# sourceMappingURL=${mapFile.base} */`,
          `/*# sourceMappingURL=${targetBase}.map */`
        )
        .replace(
          `//# sourceMappingURL=${mapFile.base}`,
          `//# sourceMappingURL=${targetBase}.map`
        )
    )

    fs.renameSync(
      path.join(mapFile.dir, mapFile.base),
      path.join(mapFile.dir, `${targetBase}.map`)
    )

    manifest[mapFile.base] = `${targetBase}.map`
  }
}
