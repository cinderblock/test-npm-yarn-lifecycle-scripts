# Test Lifecycle Scripts with Npm, Yarn, et al.

Simple repo to test which lifecycle scripts are run when using `npm`, `yarn`, and `pnpm` to install/setup this package in various ways.

## Test method

1. Setup `package.json` with lifecycle scripts to be shared between package manager
   - `prepare`
   - `prepublish`
   - `prepublishOnly`
   - `prepack`
   - `postpack`
   - `dependencies`
1. Run [various standard package manager commands](.github/workflows/test.yml) via [GitHub Actions](https://github.com/cinderblock/test-npm-yarn-lifecycle-scripts/actions)
   - `npm install`
   - `npm install <url>`
   - `npm pack`
   - `yarn install`
   - `yarn add <url>`
   - `yarn pack`
   - `pnpm install`
   - `pnpm add <url>`
   - `pnpm pack`
1. Manually inspect logs to see which scripts were run and how
   - Open `output.txt`, where possible, to see which lines were added to the file
   - Open output of main command and see if "Ran script:" message appears
   - Check `/node_modules/package-prepare` to see which files were included with package (did `.npmignore` work?)
1. Record results in table below

## Results

_Which lifecycle scripts were run? Which files were included in the package?_

| Package Manager | `.npmignore` | Add as Dependency                      | Initial Setup             | Pack                                                                     |
| --------------- | ------------ | -------------------------------------- | ------------------------- | ------------------------------------------------------------------------ |
| npm             | ✅ _(4)_     | ✖️prepublish<br>✖️prepare<br>✖️prepare | 👀prepublish<br>👀prepare | 👀prepack<br>✖️prepare<br>👀postpack                                     |
| pnpm            | ❌ _(12)_    | ✖️prepublish<br>✖️prepare              | 👀prepare                 | 👀prepublish<br>👀prepare<br>👀prepublishOnly<br>👀prepack<br>👀postpack |
| yarn            | ✅ _(4)_     | 👀prepare                              | 👀prepublish<br>👀prepare | 👀prepack<br>👀postpack                                                  |
| yarn PnP        | ❓ _(N/A)_   | 👀prepare                              | _N/A_                     | _N/A_                                                                    |
| yarn 2          | ❓ _(N/A)_   | 👀prepack<br>👀postpack                | _N/A_                     | _N/A_                                                                    |
| yarn 3          | ❓ _(N/A)_   | 👀prepack<br>👀postpack                | _N/A_                     | _N/A_                                                                    |

_👀/✖️ indicates associated logs were printed to terminal_

### Questions

1. Why does `npm install <url>` run the `prepare` script twice?
1. Why does `npm pack` run both scripts, but the `prepare` script's output is never printed?
1. Why doesn't `pnpm` respect `.npmignore`&`package.json#files` field?
1. Why is `pnpm` a different order than `npm`?
1. How is a package installed with "PnP" supposed to modify its own files?
1. **Which script(s) should be set so that a package can be consistently installed and setup in all package managers?**
