#!/usr/bin/env node

import path from "path";
import fs from "fs";
import tapReporter from "./reporters/tap.js";

const cliName = path.parse(process.argv[1]).name;
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

getFilesInDir("test").forEach(file => import(file));
setHarnessOptions(options);


function getHelpText() {
  let lines = [`Usage: ${cliName} [OPTION]`];
  lines.push("Run test files");
  lines.push("");
  Object.entries(acceptedOptions).forEach(([name, description]) => {
    lines.push(`  ${name.padEnd(20)}${description}`);
  });
  return lines.join("\n");
}

function getFilesInDir(dir) {
  // Note: this only works if working dir is the project's root
  const absoluteDir = path.resolve("test");
  const getAbsolutePaths = (file) => path.resolve(absoluteDir, file);
  return fs.readdirSync(dir).map(getAbsolutePaths);
}

function setHarnessOptions(options) {
  import("./test.js").then((module) => {
    Object.assign(module.default.options, options);
  });
}
