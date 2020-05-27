import assert from "assert";

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
  const timeout = createTimeout(2000, "Test took too long to run");
  const runningTest = Promise.resolve()
    .then(() => Promise.race([
      timeout.start(),
      runTest(test)
    ]))
    .catch(e => {
      result.error = e;
    })
    .then(() => {
      timeout.clear();
      return result;
    });
  return runningTest;
}

function createTimeout(ms, reason) {
  let timeoutID;
  return {
    start() {
      return new Promise((_, reject) => {
        timeoutID = setTimeout(() => reject(new Error(reason)), ms);
      });
    },
    clear() {
      clearTimeout(timeoutID);
    }
  };
}

function runTest(test) {
  const t = {
    assert: assert.ok,
    deepEqual: assert.deepStrictEqual,
    is: assert.strictEqual
  };
  return test.implementation(t);
}

async function report(runningTests, startTime) {
  console.log("\nRunning...");
  await printSequentially(runningTests);
  console.log(`Ran in: ${Date.now() - startTime}ms`);
}

async function printSequentially(runningTests) {
  for await (const result of runningTests) {
    print(result);
  }
}

function print(result) {
  const { error, title } = result;
  console.log(`${error ? "✗" : "✓"}  ${title}`);
  if (error) {
    console.log(error.stack);
  }
}
