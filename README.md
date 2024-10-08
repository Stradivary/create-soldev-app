create-soldev-app
=================

Codebase generator for Telkomsel


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/create-soldev-app.svg)](https://npmjs.org/package/create-soldev-app)
[![Downloads/week](https://img.shields.io/npm/dw/create-soldev-app.svg)](https://npmjs.org/package/create-soldev-app)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g create-soldev-app
$ create-soldev-app COMMAND
running command...
$ create-soldev-app (--version)
create-soldev-app/0.1.13 darwin-arm64 node-v20.14.0
$ create-soldev-app --help [COMMAND]
USAGE
  $ create-soldev-app COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`create-soldev-app help [COMMAND]`](#create-soldev-app-help-command)
* [`create-soldev-app init [NAME]`](#create-soldev-app-init-name)
* [`create-soldev-app list`](#create-soldev-app-list)
* [`create-soldev-app version`](#create-soldev-app-version)

## `create-soldev-app help [COMMAND]`

Display help for create-soldev-app.

```
USAGE
  $ create-soldev-app help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for create-soldev-app.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.8/src/commands/help.ts)_

## `create-soldev-app init [NAME]`

Create a new Telkomsel Codebase project with Soldev CLI

```
USAGE
  $ create-soldev-app init [NAME] [-f nextjs|nextjs@0.2.0] [-i] [-p]

ARGUMENTS
  NAME  Name of the project

FLAGS
  -f, --framework=<option>  Framework to use (example: nodejs)
                            <options: nextjs|nextjs@0.2.0>
  -i, --interactive         interactive mode
  -p, --npm                 Install dependencies

DESCRIPTION
  Create a new Telkomsel Codebase project with Soldev CLI
```

_See code: [src/commands/init.ts](https://github.com/Stradivary/create-soldev-app/blob/v0.1.13/src/commands/init.ts)_

## `create-soldev-app list`

list template versions from repository

```
USAGE
  $ create-soldev-app list

DESCRIPTION
  list template versions from repository

EXAMPLES
  $ create-soldev-app list
```

_See code: [src/commands/list.ts](https://github.com/Stradivary/create-soldev-app/blob/v0.1.13/src/commands/list.ts)_

## `create-soldev-app version`

```
USAGE
  $ create-soldev-app version [--json] [--verbose]

FLAGS
  --verbose  Show additional information about the CLI.

GLOBAL FLAGS
  --json  Format output as json.

FLAG DESCRIPTIONS
  --verbose  Show additional information about the CLI.

    Additionally shows the architecture, node version, operating system, and versions of plugins that the CLI is using.
```

_See code: [@oclif/plugin-version](https://github.com/oclif/plugin-version/blob/v2.2.11/src/commands/version.ts)_
<!-- commandsstop -->
