import { expect, test } from "@playwright/test";

test("Honeypot Contact form", async ({ page }) => {
  await page.goto(`/contact`);

  const inputs = await page.locator("form :is(input,textarea)").all();

  for (const input of inputs) {
    await input.waitFor({ state: "attached" });
    await input.fill("test@test.com", { force: true });
  }

  await page.locator('form [type="submit"]').click();

  expect(page.locator('[role="alert"]')).toContainText("Nice try Mr. Robot");
});
