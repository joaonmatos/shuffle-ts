#!/usr/bin/env node
import { argv } from "node:process";
import * as cmd from "cmd-ts";
import { Handler } from "../src/index.ts";
import { packageInfo } from "../src/meta.ts";

const { description, version } = await packageInfo();

const handler = Handler.create();

const command = cmd.command({
  name: "shuffle",
  version,
  description,
  args: {
    inputFile: cmd.option({
      long: "input-file",
      short: "i",
      type: cmd.string,
      description: "The input file with lines to shuffle.",
    }),
    outputFile: cmd.option({
      long: "output-file",
      short: "o",
      type: cmd.string,
      description: "The output file to write the shuffled lines to.",
    }),
  },
  handler: (input) => handler.handle(input),
});

cmd.run(command, argv.slice(2));
