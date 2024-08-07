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
create-soldev-app/0.0.0 linux-x64 node-v20.13.1
$ create-soldev-app --help [COMMAND]
USAGE
  $ create-soldev-app COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`create-soldev-app hello PERSON`](#create-soldev-app-hello-person)
* [`create-soldev-app hello world`](#create-soldev-app-hello-world)
* [`create-soldev-app help [COMMAND]`](#create-soldev-app-help-command)
* [`create-soldev-app plugins`](#create-soldev-app-plugins)
* [`create-soldev-app plugins add PLUGIN`](#create-soldev-app-plugins-add-plugin)
* [`create-soldev-app plugins:inspect PLUGIN...`](#create-soldev-app-pluginsinspect-plugin)
* [`create-soldev-app plugins install PLUGIN`](#create-soldev-app-plugins-install-plugin)
* [`create-soldev-app plugins link PATH`](#create-soldev-app-plugins-link-path)
* [`create-soldev-app plugins remove [PLUGIN]`](#create-soldev-app-plugins-remove-plugin)
* [`create-soldev-app plugins reset`](#create-soldev-app-plugins-reset)
* [`create-soldev-app plugins uninstall [PLUGIN]`](#create-soldev-app-plugins-uninstall-plugin)
* [`create-soldev-app plugins unlink [PLUGIN]`](#create-soldev-app-plugins-unlink-plugin)
* [`create-soldev-app plugins update`](#create-soldev-app-plugins-update)

## `create-soldev-app hello PERSON`

Say hello

```
USAGE
  $ create-soldev-app hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ create-soldev-app hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/Stradivary/create-soldev-app/blob/v0.0.0/src/commands/hello/index.ts)_

## `create-soldev-app hello world`

Say hello world

```
USAGE
  $ create-soldev-app hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ create-soldev-app hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/Stradivary/create-soldev-app/blob/v0.0.0/src/commands/hello/world.ts)_

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

## `create-soldev-app plugins`

List installed plugins.

```
USAGE
  $ create-soldev-app plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ create-soldev-app plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.2/src/commands/plugins/index.ts)_

## `create-soldev-app plugins add PLUGIN`

Installs a plugin into create-soldev-app.

```
USAGE
  $ create-soldev-app plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into create-soldev-app.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the CREATE_SOLDEV_APP_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the CREATE_SOLDEV_APP_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ create-soldev-app plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ create-soldev-app plugins add myplugin

  Install a plugin from a github url.

    $ create-soldev-app plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ create-soldev-app plugins add someuser/someplugin
```

## `create-soldev-app plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ create-soldev-app plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ create-soldev-app plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.2/src/commands/plugins/inspect.ts)_

## `create-soldev-app plugins install PLUGIN`

Installs a plugin into create-soldev-app.

```
USAGE
  $ create-soldev-app plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into create-soldev-app.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the CREATE_SOLDEV_APP_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the CREATE_SOLDEV_APP_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ create-soldev-app plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ create-soldev-app plugins install myplugin

  Install a plugin from a github url.

    $ create-soldev-app plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ create-soldev-app plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.2/src/commands/plugins/install.ts)_

## `create-soldev-app plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ create-soldev-app plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ create-soldev-app plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.2/src/commands/plugins/link.ts)_

## `create-soldev-app plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ create-soldev-app plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ create-soldev-app plugins unlink
  $ create-soldev-app plugins remove

EXAMPLES
  $ create-soldev-app plugins remove myplugin
```

## `create-soldev-app plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ create-soldev-app plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.2/src/commands/plugins/reset.ts)_

## `create-soldev-app plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ create-soldev-app plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ create-soldev-app plugins unlink
  $ create-soldev-app plugins remove

EXAMPLES
  $ create-soldev-app plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.2/src/commands/plugins/uninstall.ts)_

## `create-soldev-app plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ create-soldev-app plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ create-soldev-app plugins unlink
  $ create-soldev-app plugins remove

EXAMPLES
  $ create-soldev-app plugins unlink myplugin
```

## `create-soldev-app plugins update`

Update installed plugins.

```
USAGE
  $ create-soldev-app plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.2/src/commands/plugins/update.ts)_
<!-- commandsstop -->
