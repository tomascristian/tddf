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
