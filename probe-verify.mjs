import { chromium } from "playwright"
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on("pageerror", e => errors.push(e.message))
page.on("requestfailed", r => errors.push("req " + r.url().split("/").pop()))
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" })
// hero
await page.screenshot({ path: "/tmp/o-hero.png" })
// work section
const work = page.locator('section[aria-labelledby="work-heading"]')
await work.scrollIntoViewIfNeeded(); await page.waitForTimeout(500)
await work.screenshot({ path: "/tmp/o-work.png" }).catch(() => {})
// about: story art region for text sharpness
const art = page.locator('img[src*="full-text"]').first()
await art.scrollIntoViewIfNeeded(); await page.waitForTimeout(600)
await page.screenshot({ path: "/tmp/o-about.png" })
// broken images check
const broken = await page.evaluate(() => [...document.querySelectorAll("img")].filter(i => i.complete && i.naturalWidth === 0).map(i => i.src))
console.log("errors:", JSON.stringify(errors), "broken:", JSON.stringify(broken))
await browser.close()
