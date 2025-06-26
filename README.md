# Weather app

## Dev container

This is prject based on a template that uses a full-time dev container. It is opinionated and designed to be used with VS Code and a specific set of tools and settings.

Note: full-time dev container means that (almost) everything you need to do can be done from within the dev container. VS Code remotely connects to the dev container and all commands are executed inside of the dev container. Any terminals you open inside of VS Code are terminals of the dev container. This dev container is not used in a model where it lives only for the duration of one command.

### Prerequisites:

You need the following software in order to use this repository:

1. git client
2. Docker Desktop (MacOS, Windows) or docker engine (Linux)

In addtion to that you need to have the following software installed and configured:

1. VS Code
2. VS Code extension "Remote Development"
3. VS Code extension "LiveShare" for pair programming and mob programming

All other tools, e.g. TypeScript, will be available inside the dev container.

Note: if you face any issues with ports allocation you need to change used port in `webapp/vite.config.ts` and `devcontainer/docker-compose.yml`, then rebuild the container.

### Connection to the container

Normally, if your code editor has extensions for a remote development, if will show the prompt to re-open this repo in the container.
Editor reloads and starts building a container and setting things up, when ready open a console in the editor and install packages

`cd webapp && npm install`

Then usual `npm run dev`

## Source control branching model

This repository uses trunk-based development. There is only a single branch.

https://trunkbaseddevelopment.com/
