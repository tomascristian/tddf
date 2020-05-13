import path from "path";

export default async function report(runningTests, startTime) {
  console.log("");
  const summary = await reportSequentially(runningTests);
  const { failCount, passCount, endTime } = summary;
  const ok = color.green(`✓ ${passCount}`);
  const notOk = failCount ? color.red(`✗ ${failCount}`) : "";
  const runTime = color.grey(`Ran in ${endTime - startTime}ms`);
  console.log(`\n${ok} ${notOk} ${runTime}`);
}

async function reportSequentially(runningTests) {
  let failCount = 0;
  for await (const result of runningTests) {
    if (result.error) {
      failCount++;
      console.log(formatTestFailure(result));
    }
  }
  return { failCount, passCount: runningTests.length - failCount, endTime: Date.now() };
}

function formatTestFailure(result) {
  const { error, title } = result;
  const { message, stack, operator } = error;
  const header = color.red(`✗ ${title}`);
  const path = color.grey(getFilePath(stack));
  const errorMsg = formatMessage(message, operator);
  return `${header}\n${path}\n${errorMsg}`;
}

function getFilePath(stack) {
  const absolute = stack.match(/^ *at.*\(file:\/\/(.*?)\)/m)[1];
  return path.relative(process.cwd(), absolute);
}

function formatMessage(message, operator) {
  if (operator === "deepStrictEqual") {
    return message.split("\n").slice(3).join("\n");
  }
  if (operator === "strictEqual") {
    return message.replace(/\n\n/g, "\n");
  }
  return message;
}

const color = {
  red: wrapIn(31),
  green: wrapIn(32),
  grey: wrapIn(90),
};

// TODO: consider checking for color support in terminal
function wrapIn(colorCode) {
  return (str) => wrapInSGR(str, colorCode);
}

function wrapInSGR(str, parameters) {
  const csi = "\u001b[";
  const reset = csi + 0 + "m";
  return csi + parameters + "m" + str + reset;
}
