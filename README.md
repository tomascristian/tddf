# tddf

## **WARNING: this is a very early and probably very unstable version.**

## Overview

Testing framework focused on developer ergonomics.

## Highlights

- API 100% compatible (tests run without any modifications) with [node-tap](https://github.com/tapjs/node-tap), [tape](https://github.com/substack/tape) and [AVA](https://github.com/avajs/ava). Migrating to [Jest](https://github.com/facebook/jest) possible via [codemod](https://jestjs.io/docs/en/migration-guide#jest-codemods).

- Tests are easily debuggable (just set a breakpoint and run!).

- Does not require a dedicated test runner. Test files are directly runnable (eg. `node test.js`).

- Includes a test runner anyways, for your convenience.

- Supports async tests (and they run concurrently!).

- Includes a tiny assertion library, but you can use any other you want.

- No dependencies.

- Fast!

## Installing
```
npm install tddf
```
Then set your `test` script to `tddf` in your project's `package.json`.

## Usage

### Write your tests 

Create a test file anywhere in your project (eg. `silly.test.js`).

```js
import test from "tddf";

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
npm test
```

## Other Notes
- Requires Node.js v12.17+ (for ES modules support).
