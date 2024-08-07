#!/usr/bin/env node_modules/.bin/ts-node
// eslint-disable-next-line n/shebang, unicorn/prefer-top-level-await, 
;(async () => {
  const oclif = await import('@oclif/core')
  await oclif.execute({development: true, dir: __dirname})
})()
