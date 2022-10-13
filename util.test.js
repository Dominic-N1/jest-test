const { generateText, checkAndGenerate } = require("./util");

test("should output name and age", () => {
  const text = generateText("Dom", 30);
  expect(text).toBe(`Dom (30 years old)`);
});

test("should output data-less text", () => {
  const text = generateText("", null);
  expect(text).toBe(" (null years old)");
  const text2 = generateText();
  expect(text2).toBe("undefined (undefined years old)");
});

test("should generate a valid output", () => {
  const text = checkAndGenerate("Dom", 30);
  expect(text).toBe(`Dom (30 years old)`);
});
