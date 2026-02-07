import { expect, test } from "@playwright/test";
import type { Page, TestInfo } from "@playwright/test";

async function openMenu(page: Page) {
  const trigger = page.getByTestId("staggered-menu-trigger");
  await expect(trigger).toBeVisible();
  await expect(trigger).toHaveAttribute("data-mounted", "true");
  await trigger.click();
  const panel = page.getByTestId("staggered-menu-panel");
  await expect(panel).toBeVisible();
  await page.waitForFunction(() => {
    const node = document.querySelector('[data-testid="staggered-menu-panel"]') as HTMLElement | null;
    if (!node) return false;
    const transform = window.getComputedStyle(node).transform;
    if (!transform || transform === "none") return true;
    const match = transform.match(/matrix\(([^)]+)\)/);
    if (!match) return false;
    const values = match[1].split(",").map((value) => Number.parseFloat(value.trim()));
    const translateX = values[4] ?? 0;
    return Math.abs(translateX) < 1;
  });
}

async function assertFocusInsidePanel(page: Page) {
  const focusedInsidePanel = await page.evaluate(() => {
    const panelNode = document.querySelector('[data-testid="staggered-menu-panel"]');
    return !!panelNode && panelNode.contains(document.activeElement);
  });
  expect(focusedInsidePanel).toBeTruthy();
}

async function attachMenuScreenshot(page: Page, testInfo: TestInfo, name: string) {
  const screenshot = await page.screenshot({ fullPage: true });
  await testInfo.attach(name, {
    body: screenshot,
    contentType: "image/png",
  });
}

test.describe("StaggeredMenu behavior", () => {
  test("open-close, keyboard, focus trap, clickable items, layering (/en)", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/en");

    await openMenu(page);
    await attachMenuScreenshot(page, testInfo, "menu-en-open");

    await page.keyboard.press("Escape");
    await expect(page.getByTestId("staggered-menu-panel")).toBeHidden();

    await openMenu(page);
    await page.getByTestId("staggered-menu-backdrop").click();
    await expect(page.getByTestId("staggered-menu-panel")).toBeHidden();

    await openMenu(page);
    const panel = page.getByTestId("staggered-menu-panel");

    for (let i = 0; i < 8; i += 1) {
      await page.keyboard.press("Tab");
      await assertFocusInsidePanel(page);
    }

    for (let i = 0; i < 5; i += 1) {
      await page.keyboard.press("Shift+Tab");
      await assertFocusInsidePanel(page);
    }

    const firstItem = panel.locator("a").first();
    await expect(firstItem).toBeVisible();
    await firstItem.click();
    await expect(page).toHaveURL(/#services|#case-studies|#about/);

    await openMenu(page);
    const overlayZIndex = await page.getByTestId("staggered-menu-overlay").evaluate((el) =>
      Number.parseInt(window.getComputedStyle(el).zIndex || "0", 10)
    );
    expect(overlayZIndex).toBeGreaterThan(50);
  });

  test("responsive trigger visibility: desktop and mobile", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/en");
    await expect(page.getByTestId("staggered-menu-trigger")).toBeVisible();

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/en");
    await expect(page.getByTestId("staggered-menu-trigger")).toBeVisible();
  });

  test("layout/readability/overlay checks for both /en and /ar", async ({ page }, testInfo) => {
    const locales = ["/en", "/ar"];
    await page.setViewportSize({ width: 1280, height: 900 });

    for (const locale of locales) {
      await page.goto(locale);
      await openMenu(page);

      const viewport = page.viewportSize();
      expect(viewport).not.toBeNull();
      const viewportWidth = viewport!.width;
      const viewportHeight = viewport!.height;

      const panel = page.getByTestId("staggered-menu-panel");
      const overlay = page.getByTestId("staggered-menu-overlay");
      const firstItem = panel.locator("a").first();

      const panelBox = await panel.boundingBox();
      expect(panelBox).not.toBeNull();
      expect(panelBox!.width).toBeGreaterThan(200);
      expect(panelBox!.height).toBeGreaterThan(300);
      expect(panelBox!.x).toBeGreaterThanOrEqual(-1);
      expect(panelBox!.y).toBeGreaterThanOrEqual(-1);
      expect(panelBox!.x + panelBox!.width).toBeLessThanOrEqual(viewportWidth + 1);
      expect(panelBox!.y + panelBox!.height).toBeLessThanOrEqual(viewportHeight + 1);

      const overlayBox = await overlay.boundingBox();
      expect(overlayBox).not.toBeNull();
      expect(overlayBox!.width).toBeGreaterThanOrEqual(viewportWidth * 0.9);
      expect(overlayBox!.height).toBeGreaterThanOrEqual(viewportHeight * 0.9);

      const text = await firstItem.textContent();
      expect((text ?? "").trim().length).toBeGreaterThan(0);

      const readability = await firstItem.evaluate((el) => {
        const style = window.getComputedStyle(el);
        const parent = el.closest('[data-testid="staggered-menu-panel"]') as HTMLElement | null;
        const parentStyle = parent ? window.getComputedStyle(parent) : null;
        return {
          fontSize: Number.parseFloat(style.fontSize || "0"),
          color: style.color,
          backgroundColor: parentStyle?.backgroundColor ?? "",
          opacity: Number.parseFloat(style.opacity || "1"),
        };
      });

      expect(readability.fontSize).toBeGreaterThanOrEqual(18);
      expect(readability.opacity).toBeGreaterThan(0.8);
      expect(readability.color).not.toEqual(readability.backgroundColor);

      await attachMenuScreenshot(page, testInfo, `menu-${locale.replace("/", "")}-layout`);

      await page.keyboard.press("Escape");
      await expect(panel).toBeHidden();
    }
  });

  test("RTL side behavior: /en opens right, /ar opens left", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1280, height: 900 });

    await page.goto("/en");
    await openMenu(page);
    const enPanelBox = await page.getByTestId("staggered-menu-panel").boundingBox();
    expect(enPanelBox).not.toBeNull();
    expect(enPanelBox!.x).toBeGreaterThan(640);
    await attachMenuScreenshot(page, testInfo, "menu-en-side");
    await page.keyboard.press("Escape");

    await page.goto("/ar");
    await openMenu(page);
    const arPanelBox = await page.getByTestId("staggered-menu-panel").boundingBox();
    expect(arPanelBox).not.toBeNull();
    expect(arPanelBox!.x).toBeLessThan(200);
    await attachMenuScreenshot(page, testInfo, "menu-ar-side");
  });
});
