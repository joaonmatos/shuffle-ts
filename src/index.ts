import * as fs from "node:fs/promises";
import { shuffle } from "./util.ts";

export type HandlerProps = {
  readFile: ReadFile;
  writeFile: WriteFile;
};

export type ReadFile = (inputFile: string) => Promise<string>;

export type WriteFile = (
  outputFile: string,
  outputContent: string,
) => Promise<void>;

export type HandlerInput = {
  readonly inputFile: string;
  readonly outputFile: string;
};

export class Handler {
  readonly #readFile: ReadFile;
  readonly #writeFile: WriteFile;

  constructor({ readFile, writeFile }: HandlerProps) {
    this.#readFile = readFile;
    this.#writeFile = writeFile;
  }

  static create(): Handler {
    return new Handler({
      readFile,
      writeFile,
    });
  }

  async handle({ inputFile, outputFile }: HandlerInput): Promise<void> {
    const input = await this.#readFile(inputFile);
    const lines = input
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");
    shuffle(lines);
    let output = lines.join("\n");
    if (output.length > 0) {
      output += "\n";
    }
    await this.#writeFile(outputFile, output);
  }
}

async function readFile(inputFile: string): Promise<string> {
  return await fs.readFile(inputFile, "utf8");
}

async function writeFile(
  outputFile: string,
  outputContent: string,
): Promise<void> {
  await fs.writeFile(outputFile, outputContent, { encoding: "utf8" });
}
