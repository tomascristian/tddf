import test from "./test.js";

test("Runs", t => {
  t.assert(true);
});

test("Tests fail with helpful information", t => {
  t.is("P", "NP");
});

test("Keeps running tests after a failed test", t => {
  t.assert(true);
});

{
  const fakeAsyncTask = ({ duration = 30, returnValue = undefined } = {}) => {
    return new Promise(resolve => setTimeout(resolve, duration, returnValue));
  };

  test("Supports async", async t => {
    const result = await fakeAsyncTask({ returnValue: true });
    t.assert(result);
  });

  test("Throwing inside async tests fails the test", async t => {
    await fakeAsyncTask();
    throw Error();
  });

  const slowest = 60;
  test(`Runs tests concurrently, all finish in about ${slowest}ms`, async t => {
    await fakeAsyncTask({ duration: slowest });
    t.assert(true);
  });
}

test("Displays pretty diff", t => {
  t.deepEqual({ a: "a", b: "b" }, { a: "notA", b: "b" });
});
