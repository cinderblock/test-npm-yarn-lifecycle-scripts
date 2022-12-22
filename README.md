# Test Prepare / Prepack Lifecycle Scripts with Npm & Yarn

Simple repo to test which lifecycle scripts are run when using `npm`, `yarn`, and `pnpm` to install/setup this package in various ways.

## Results

These are the results manually extracted from [the logs](https://github.com/cinderblock/test-npm-yarn-lifecycle-scripts/actions).

| Package Manager | `.npmignore`        | Add as Dependency                | Initial Setup             | Pack                                                                     |
| --------------- | ------------------- | -------------------------------- | ------------------------- | ------------------------------------------------------------------------ |
| npm             | ✅                  | prepublish<br>prepare<br>prepare | prepublish👀<br>prepare👀 | prepack👀<br>prepare<br>postpack👀                                       |
| pnpm            | Doesn't cleanup     | prepublish<br>prepare            | prepare👀                 | prepublish👀<br>prepare👀<br>prepublishOnly👀<br>prepack👀<br>postpack👀 |
| yarn            | ✅                  | prepare👀                        | prepublish👀<br>prepare👀 | prepack👀<br>postpack👀                                                  |
| yarn PnP        | _No `node_modules`_ | prepare👀                        | _N/A_                     | _N/A_                                                                    |
| yarn 3          | _No `node_modules`_ | prepack👀<br>postpack👀          | _N/A_                     | _N/A_                                                                    |

_👀 indicates associated logs were printed to terminal_

### Questions

1. Why does `npm install <url>` run the `prepare` script twice?
1. Why does `npm pack` run both scripts, but the `prepare` script's output is never printed?
1. Why doesn't `pnpm` respect `.npmignore`&`package.json#files` field?
1. Why is `pnpm` a different order than `npm`?
1. **Which script(s) should be set so that a package can be consistently installed and setup in all package managers?**
