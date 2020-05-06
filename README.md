# test

## Overview

Minimalist unit testing library with just the features I need.

## Highlights

- API 100% compatible (tests run without any modifications) with [node-tap](https://github.com/tapjs/node-tap), [tape](https://github.com/substack/tape) and [AVA](https://github.com/avajs/ava). Migrating to [Jest](https://github.com/facebook/jest) possible via [codemod](https://jestjs.io/docs/en/migration-guide#jest-codemods).

- Does not require a dedicated test runner. Test files are directly runnable (eg. `node test.js`).

- Tests are easily debuggable (just set a breakpoint and run!).

- Supports async tests (and they run concurrently!).

- Includes a tiny assertion library, but you can use any other you want.

- No dependencies or build process.

- Fast!

## Try it out
It's not on npm yet, sorry! Meanwhile you can:
```
git clone https://github.com/tomascristian/test/
cd test
npm test
```
Or you can play with it here: https://codesandbox.io/s/github/tomascristian/test

## Usage

### Write your tests 

Create a test file anywhere with any name you want (eg. `silly.test.js`).

```js
import test from "path-to-test-but-not-your-file-i-mean-the-library-file-test.js";

test("Stuff", t => {
	t.assert("Things");
});

test("Async stuff", async t => {
  const expected = "I come from the future!";
	const result = Promise.resolve(expected);
	t.is(await result, expected);
});
```

### Run your tests
```
node silly.test.js
```

## Other Notes
- Requires Node.js v13+ (needs ES modules support, Node.js v12 might work with --experimental-modules flag).

## TO-DO / V1 ROADMAP
- Add test timeouts.
- Improve default reporter.
- Consider extra assertions.
- Consider extra features (only, skip, beforeEach, afterEach).
- Add optional TAP reporter.
- Make browser compatible.
- Publish it to npm.
- Work on my library naming skills... 🙃
