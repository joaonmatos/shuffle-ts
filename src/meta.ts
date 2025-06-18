import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

export type PackageInfo = {
  readonly description: string;
  readonly version: string;
};

export async function packageInfo(): Promise<PackageInfo> {
  const dir = import.meta.dirname;
  const filepath = resolve(dir, "../package.json");
  const json = await readFile(filepath, "utf8");
  const content = JSON.parse(json);
  return parsePkgInfo(content);
}

function parsePkgInfo(value: unknown): PackageInfo {
  console.log(value);
  if (typeof value !== "object") {
    throw new TypeError("Expected an object.");
  }
  const obj = value as object;
  let description: string;
  let version: string;
  if (Object.hasOwn(obj, "description")) {
    const anyVal = Object.getOwnPropertyDescriptor(obj, "description")?.value;
    if (typeof anyVal !== "string") {
      throw new TypeError("PackageInfo.description must be a string.");
    }
    const desc = (anyVal as string).trim();
    if (desc === "") {
      throw new TypeError("PackageInfo.description must not be blank.");
    }
    description = desc;
  } else {
    throw new TypeError("PackageInfo.description must be a string.");
  }
  if (Object.hasOwn(obj, "version")) {
    const anyVal = Object.getOwnPropertyDescriptor(obj, "version")?.value;
    if (typeof anyVal !== "string") {
      throw new TypeError("PackageInfo.version must be a string.");
    }
    const ver = (anyVal as string).trim();
    if (ver === "") {
      throw new TypeError("PackageInfo.version must not be blank.");
    }
    version = ver;
  } else {
    throw new TypeError("PackageInfo.version must be a string.");
  }
  return { description, version };
}
