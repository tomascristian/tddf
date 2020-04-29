# test

## Overview

Minimalist unit testing library with just the features I need.

## Highlights

- API 100% compatible (tests run without any modifications) with [node-tap](https://github.com/tapjs/node-tap), [tape](https://github.com/substack/tape) and [AVA](https://github.com/avajs/ava). Migrating to [Jest](https://github.com/facebook/jest) possible via [codemod](https://jestjs.io/docs/en/migration-guide#jest-codemods).

- Does not require a dedicated test runner. Test files are directly runnable (eg. `node test.js`).

- Tests are easily debuggable (just set a breakpoint and run!).

- Includes a tiny assertion library, but you can use any other you want.

- No dependencies or build process.

- Fast!

## Other Notes
- Requires Node.js v13+ (needs ES modules support, Node.js v12 might work with --experimental-modules flag).

## TO-DO / V1 ROADMAP
- Add support for async tests.
- Add ability to run tests concurrently.
- Add test timeouts.
- Improve default reporter.
- Consider extra assertions.
- Consider extra features (only, skip, beforeEach, afterEach).
- Add optional TAP reporter.
- Make browser compatible.
- Publish it to npm.
- Work on my library naming skills... 🙃