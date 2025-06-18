import { readFile, writeFile } from "node:fs/promises";
import { shuffle } from "./util.ts";

export type HandlerInput = {
  readonly inputFile: string;
  readonly outputFile: string;
};

export async function handler(input: HandlerInput): Promise<void> {
  const { inputFile, outputFile } = input;
  const inputText = await readFile(inputFile, "utf8");
  const lines = inputText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");
  shuffle(lines);
  const outputText = `${lines.join("\n")}\n`.trimStart();
  await writeFile(outputFile, outputText, { encoding: "utf8" });
}
