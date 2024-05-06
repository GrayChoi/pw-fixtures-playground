import { expect } from "@playwright/test";
import path from "path";
import { lock, check } from "proper-lockfile";

export const process = async () => {
  const lockFilePath = path.join(__dirname, "../task.lock");

  let release;
  try {
    release = await lock(lockFilePath);

    console.log("Processing...");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await release();
  } catch (error) {
    await expect(async () => {
      const isLocked = await check(lockFilePath);
      if (isLocked) {
        throw new Error("Lock file is still locked");
      }
    }).toPass();
  }

  console.log("Done!");
};
