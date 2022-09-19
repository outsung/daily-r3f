import fs from "fs/promises";

export enum ReadableFolder {
  PREVIEWABLE_MODELS = "src/assets/model",
}
export async function readFolder(path: ReadableFolder) {
  const dir = await fs.opendir(path);
  const paths: string[] = [];

  for await (const file of dir) {
    paths.push(file.name);
  }

  return paths;
}