import { test } from "../base-test";
import { process } from "../common/locker";

// 使用定制的测试函数
test("test 1", async ({ cnt }) => {
  console.log(`New counter value in Test 1: ${cnt}`);
  await process();
});

test("test 2", async ({ cnt }) => {
  console.log(`New counter value in Test 2: ${cnt}`);
  await process();
});

test("test 3", async ({ cnt }) => {
  console.log(`New counter value in Test 3: ${cnt}`);
  await process();
});

test("test 4", async ({ cnt }) => {
  console.log(`New counter value in Test 4: ${cnt}`);
  await process();
});

test("test 5", async ({ cnt }) => {
  console.log(`New counter value in Test 5: ${cnt}`);
  await process();
});

test("test 6", async ({ cnt }) => {
  console.log(`New counter value in Test 6: ${cnt}`);
  await process();
});
