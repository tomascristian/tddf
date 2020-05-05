import assert from "assert";

export default addTest;

process.nextTick(runTests); // Wait until test file is parsed

const suite = [];

function addTest(title, implementation) {
  const test = createTest(title, implementation);
  suite.push(test);
}

function createTest(title, implementation) {
  return {
    title,
    error: null,
    run() {
      try {
        implementation({ // We're passing it a "test execution context" (t)
          assert: assert.ok,
          deepEqual: assert.deepStrictEqual,
          is: assert.strictEqual
        });
      } catch (e) {
        this.error = e;
      }
    }
  };
}

function runTests() {
  console.log("\nRunning...");
  console.time("Ran in");
  for (const test of suite) {
    test.run();
    report(test);
  }
  console.timeEnd("Ran in");
}

function report({ error, title }) {
  console.log(`${error ? "✗" : "✓"}  ${title}`);
  if (error) {
    console.log(error.stack);
  }
}
