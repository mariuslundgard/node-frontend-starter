# node-hipster-starter

Real hipster starter repos don’t follow no trend (and don’t use no emojis).

## Features

* **Simple application structure** using a few meaningful directories, virtual DOM and CSS modules.
* **Hot reloads** the server and client in development.
* **Bundles server and client code** in production.

## Philosophy

I don’t particularly like grouping isomorphic code by environment category like this:

```
src/
  browser/
  server/
  shared/
```

... because it quickly leads to duplicate directories:

```
src/
  browser/
    v1/
      app/
      frame/
  server/
    v1/
      app/
      frame/
```

Instead, I’d organize code by screen and use files for platform separation:

```
src/
  v1/
    app/
      browser.js
      server.js
    frame/
      browser.js
      server.js
```

This way, it’s easier to work within scopes of functionality.

## If I can do it so can you

```sh
# Initialize using degit
degit mariuslundgard/node-hipster-starter my-app
cd my-app
# Update package.json and README to make it your own
npm install
# Run `npm run watch` to start developing
# Or `npm run build && npm start` to run production version
```

## Module Name Dropping

* `eslint` with `standard`
* `eslint-prettier-cli`
* `express` (’cause it’s all I need)
* `flow`
* `husky`
* `jest`
* `postcss` with plugins
* `preact` (’cause it’s tiny)
* `prettier`
* `rollup`
* `supertest`
