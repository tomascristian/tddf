export default async function report(runningTests, startTime) {
  const lines = ["TAP version 13"];
  lines.push(`1..${runningTests.length}`);
  let testCount = 0;
  for await (const result of runningTests) {
    testCount++;
    const { error, title } = result;
    lines.push(`${error ? "not ok" : "ok"} ${testCount} ${title}`);
    if (error) {
      lines.push("---");
      lines.push(error.stack);
      lines.push("...");
    }
  }
  lines.push(`# Ran in: ${Date.now() - startTime}ms`);
  console.log(lines.join("\n"));
}
