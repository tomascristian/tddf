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
    result: undefined,
    start() {
      this.result = this.run();
    },
    async run() {
      try {
        await implementation({ // Pass in a test execution contest (t)
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

async function runTests() {
  console.log("\nRunning...");
  console.time("Ran in");
  for (const test of suite) {
    test.start();
  }
  for (const test of suite) {
    await test.result;
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
