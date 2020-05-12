import assert from "assert";
import report from "./reporters/default.js";

export default addTest;

const suite = [];
function addTest(title, implementation) {
  const test = { title, implementation };
  suite.push(test);
}

process.nextTick(startTests); // Wait until test file is parsed

function startTests() {
  const startTime = Date.now();
  const runningTests = suite.map(startTest);
  report(runningTests, startTime);
}

function startTest(test) {
  const result = { error: null, title: test.title };
  const runningTest = Promise.resolve()
    .then(() => runTest(test))
    .catch(e => {
      result.error = e;
    })
    .then(() => result);
  return runningTest;
}

function runTest(test) {
  const t = {
    assert: assert.ok,
    deepEqual: assert.deepStrictEqual,
    is: assert.strictEqual
  };
  return test.implementation(t);
}
