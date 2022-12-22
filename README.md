# Test Prepare / Prepack Lifecycle Scripts with Npm & Yarn

Simple repo to test which lifecycle scripts are run when using `npm`, `yarn`, and `pnpm` to install/setup this package in various ways.

## Results

These are the results manually extracted from [the logs](https://github.com/cinderblock/test-npm-yarn-lifecycle-scripts/actions).

| Package Manager (`x`) | Ignore | `x install/add <url>`  | `git clone && x install` | `git clone && x pack`  |
| --------------------- | ------ | ---------------------- | ------------------------ | ---------------------- |
| npm                   | ✔️     | ❌prepare<br>❌prepare | ✅prepare                | ✅prepack<br>❌prepare |
| yarn                  | ✔️     | ✅prepare              | ✅prepare                | ✅prepack              |
| pnpm                  | ❌     |                        | ✅prepare                | ✅prepare<br>✅prepack |

_✅/❌ indicate if the logs were printed to terminal for the associated lifecycle script_

### Questions

1. Why does `npm install <url>` run the `prepare` script twice?
1. Why does `npm pack` run both scripts, but the `prepare` script's output is never printed?
1. Why doesn't `pnpm` respect `.npmignore`&`package.json#files` field?
1. Why is `pnpm` a different order than `npm`?
