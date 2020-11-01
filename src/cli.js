#!/usr/bin/env node

import { parse, resolve } from "path";
import { readdir } from "fs/promises";
import tapReporter from "./reporters/tap.js";

const cliName = parse(process.argv[1]).name;
process.title = cliName;

const options = {};

const acceptedOptions = {
  "--tap-reporter": "Use tap reporter",
  "--help": "Display this help"
};
const maxOptions = Object.keys(acceptedOptions).length;
const getHelpMsg = `Try '${cliName} --help' for more information`;

const args = process.argv.slice(2);

if (args.length > maxOptions) {
  console.error(`${cliName}: too many arguments\n${getHelpMsg}`);
  process.exit(1); // TODO: This might truncate output, exit more gracefully
}

if (args.includes("--help")) {
  console.log(getHelpText());
  process.exit();
}

if (args.includes("--tap-reporter")) {
  options.reporter = tapReporter;
}

(async () => {
  const testFiles = await getTestFiles();
  testFiles.forEach(file => import(file));
  setHarnessOptions(options);
})();

function getHelpText() {
  let lines = [`Usage: ${cliName} [OPTION]`];
  lines.push("Run test files");
  lines.push("");
  Object.entries(acceptedOptions).forEach(([name, description]) => {
    lines.push(`  ${name.padEnd(20)}${description}`);
  });
  return lines.join("\n");
}

// Gets `./**/test/*.js` and `./**/*.test.js` file paths.
async function getTestFiles(path = ".") {
  const dirents = await readdir(path, { withFileTypes: true });

  const files = dirents.filter(isTestFile).map(toPath);
  const dirs = dirents.filter(isWantedDirectory).map(toPath);

  const subdirFiles = await Promise.all(dirs.map(getTestFiles));

  return files.concat(...subdirFiles);

  function isTestFile(dirent) {
    const { name } = dirent;
    const isInsideTestFolder = path.endsWith("test") && name.endsWith(".js");
    return dirent.isFile() && (isInsideTestFolder || name.endsWith(".test.js"));
  }

  function isWantedDirectory(dirent) {
    return dirent.isDirectory()
    && !dirent.name.startsWith(".")
    && dirent.name !== "node_modules";
  }

  function toPath(dirent) {
    return resolve(path, dirent.name);
  }
}

function setHarnessOptions(options) {
  import("./test.js").then((module) => {
    Object.assign(module.default.options, options);
  });
}
