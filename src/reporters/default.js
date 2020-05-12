export default report;

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
