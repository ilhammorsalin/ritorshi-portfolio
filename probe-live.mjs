import { chromium } from "playwright"
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto("https://ritorshi-portfolio.vercel.app/", { waitUntil: "networkidle" })
await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }))
await page.waitForLoadState("networkidle")
const res = await page.evaluate(() => performance.getEntriesByType("resource").map(r => ({
  url: r.name.split("?")[0].split("/").pop() || r.name,
  type: r.initiatorType,
  size: Math.round(r.transferSize / 1024),
  dur: Math.round(r.duration)
})))
const imgs = res.filter(r => r.type === "img" || /image|\.png|\.jpg|\.webp|\.svg/.test(r.url)).sort((a, b) => b.size - a.size)
console.log("image/asset responses (KB):")
console.log(JSON.stringify(imgs, null, 1))
console.log("total img KB:", imgs.reduce((s, r) => s + r.size, 0))
await browser.close()
