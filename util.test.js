const puppeteer = require("puppeteer"); // Node.js library for emulate Chrome/Chromium like brawsers
const { generateText, checkAndGenerate } = require("./util");

// unit testing
test("should output name and age", () => {
  const text = generateText("Dom", 30);
  expect(text).toBe(`Dom (30 years old)`);
});

test("should output data-less text", () => {
  expect(generateText("", null)).toBe(" (null years old)");
  expect(generateText()).toBe("undefined (undefined years old)");
});

// integration testing
test("should generate a valid output", () => {
  expect(checkAndGenerate("Dom", 30)).toBe(`Dom (30 years old)`);
});
// e2e testing
test("should create an element with text and correct class", async () => {
  const browser = await puppeteer.launch({
    headless: true, // change to false & uncomment next 2 lines to see browser behavior
    // slowMo: 80,
    // args: ["--window-size=1920,1080"],
  });
  const page = await browser.newPage();
  await page.goto(`${__dirname}/index.html`);
  await page.click("input#name");
  await page.type("input#name", "John");
  await page.click("input#age");
  await page.type("input#age", "25");
  await page.click("#btnAddUser");
  const checkedData = await page.$eval(".user-item", (el) => el.textContent);
  expect(checkedData).toBe("John (25 years old)");
}, 15000); // 15000 max test time in "ms" you can delete it, by default it will be 5000ms
