#!/usr/bin/env -S node --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("ts-node/esm", pathToFileURL("./"));'
// eslint-disable-next-line n/shebang
import {execute} from '@oclif/core'

await execute({development: true, dir: import.meta.url})
