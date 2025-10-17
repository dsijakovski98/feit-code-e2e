import { expect, test } from "@playwright/test";

test("Honeypot Subscribe form", async ({ page }) => {
  await page.goto("");

  await page.locator("form").scrollIntoViewIfNeeded();
  const inputs = await page.locator("form input").all();

  for (const input of inputs) {
    await input.waitFor({ state: "attached", timeout: 3000 });
    await input.fill("test@test.com", { force: true, timeout: 3000 });
  }

  await page.locator('form [type="submit"]').focus();
  await page.keyboard.press("Enter");

  await page.getByRole("alert").waitFor({ state: "visible", timeout: 3000 });
  const alert = await page.locator('form [role="alert"] p').textContent();

  expect(alert).toContain("Nice try Mr. Robot");
});
