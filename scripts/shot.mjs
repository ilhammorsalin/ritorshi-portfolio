import { chromium } from "playwright"
import { mkdir } from "node:fs/promises"

const URL = process.env.URL ?? "http://localhost:3000/"
const OUT = "/tmp/shots"
const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
]
const STEPS = 5

await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()
const errors = []

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  })
  const page = await context.newPage()
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      errors.push(`[${vp.name}] ${message.type()}: ${message.text()}`)
    }
  })
  page.on("pageerror", (error) => errors.push(`[${vp.name}] pageerror: ${error.message}`))

  await page.goto(URL, { waitUntil: "networkidle" })
  await page.waitForTimeout(1200)

  const metrics = await page.evaluate(() => ({
    scrollHeight: document.documentElement.scrollHeight,
    innerHeight: window.innerHeight,
    backdrop: (() => {
      const layer = document.querySelector('main > div[class*="fixed"] > div')
      if (!layer) return null
      const rect = layer.getBoundingClientRect()
      const img = layer.querySelector("img")
      const imgRect = img?.getBoundingClientRect()
      return {
        height: Math.round(rect.height),
        top: Math.round(rect.top),
        bottom: Math.round(rect.bottom),
        imgWidth: imgRect ? Math.round(imgRect.width) : null,
        imgHeight: imgRect ? Math.round(imgRect.height) : null,
        transform: getComputedStyle(layer).transform,
      }
    })(),
  }))

  console.log(`--- ${vp.name} ${vp.width}x${vp.height} ---`)
  console.log(JSON.stringify(metrics, null, 2))

  const maxScroll = metrics.scrollHeight - vp.height
  for (let i = 0; i < STEPS; i++) {
    const ratio = i / (STEPS - 1)
    await page.evaluate((top) => window.scrollTo(0, top), Math.round(maxScroll * ratio))
    await page.waitForTimeout(400)
    await page.screenshot({ path: `${OUT}/${vp.name}-${i}.png` })
  }

  await context.close()
}

await browser.close()

if (errors.length) {
  console.log("--- console messages ---")
  for (const line of errors) console.log(line)
} else {
  console.log("no console errors or warnings")
}
