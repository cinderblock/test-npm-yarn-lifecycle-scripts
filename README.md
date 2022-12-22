# Test Prepare / Prepack Lifecycle Scripts with Npm & Yarn

Simple repo to test which lifecycle scripts are run when using `npm`, `yarn`, and `pnpm` to install/setup this package in various ways.

## Results

These are the results manually extracted from [the logs](https://github.com/cinderblock/test-npm-yarn-lifecycle-scripts/actions).

| Package Manager | `.npmignore`      | Add as Dependency  | Initial Setup | Pack                   |
| --------------- | ----------------- | ------------------ | ------------- | ---------------------- |
| npm             | ✅                | prepare<br>prepare | prepare👀     | prepack👀<br>prepare   |
| pnpm            | Doesn't cleanup   |                    | prepare👀     | prepare👀<br>prepack👀 |
| yarn            | ✅                | prepare👀          | prepare👀     | prepack👀              |
| yarn PnP        | No `node_modules` | prepare👀          | _N/A_         | _N/A_                  |
| yarn 2          | No `node_modules` | prepare👀          | _N/A_         | _N/A_                  |

_👀 indicates associated logs were printed to terminal_

### Questions

1. Why does `npm install <url>` run the `prepare` script twice?
1. Why does `npm pack` run both scripts, but the `prepare` script's output is never printed?
1. Why doesn't `pnpm` respect `.npmignore`&`package.json#files` field?
1. Why is `pnpm` a different order than `npm`?
1. Which script(s) should be set so that a package can be consistently installed and setup in all package managers?
