/**
 * Asset optimizer.
 *
 * Usage:
 *   node scripts/optimize-assets.mjs                 # process every configured asset
 *   node scripts/optimize-assets.mjs space-bg crt    # process a subset by label
 *
 * Workflow: keep lossless masters in Assets/ (never imported), run this script,
 * and reference the emitted /public/<label>.webp files in <Image> tags.
 */
import sharp from "sharp"
import { mkdir } from "node:fs/promises"
import path from "node:path"

// label -> master file in Assets/, target width (px), sharp quality.
// Target width rule of thumb: 2x the widest slot the asset renders into.
const assets = [
  { label: "space-bg", master: "Assets/space-bg.png", width: 1600, quality: 75 },
  { label: "hero-text", master: "Assets/hero-text/hero text.png", width: 1024, quality: 85 },
  { label: "full-text", master: "Assets/about-me/full-text.png", width: 1164, quality: 90 },
  { label: "crt", master: "Assets/portfolio-icons/crt-bg-removed-with-image.png", width: 512, quality: 85 },
  { label: "camera", master: "Assets/portfolio-icons/camera-without-bg.png", width: 512, quality: 85 },
  { label: "sketchbook", master: "Assets/portfolio-icons/sketchbook-bg-removed.png", width: 512, quality: 85 },
  { label: "monitor", master: "Assets/testimonials/monitor for testimonial.png", width: 1024, quality: 85 },
  { label: "red-banner", master: "Assets/about-me/red-banner.png", width: 531, quality: 85 },
  { label: "yellow-banner", master: "Assets/about-me/yellow-banner.png", width: 799, quality: 85 },
  { label: "polaroid-1", master: "Assets/about-me/polaroid 1.png", width: 495, quality: 85 },
  { label: "testimonials", master: "Assets/testimonials/Testimonials.png", width: 1199, quality: 85 },
]

const only = process.argv.slice(2)
const selected = only.length ? assets.filter(a => only.includes(a.label)) : assets
if (!selected.length) {
  console.error("No matching asset for:", only.join(", "))
  process.exit(1)
}

await mkdir(path.resolve("public"), { recursive: true })

for (const asset of selected) {
  const input = sharp(asset.master)
  const meta = await input.metadata()
  const outPath = path.resolve("public", `${asset.label}.webp`)
  const info = await input
    .resize({ width: Math.min(asset.width, meta.width ?? asset.width) })
    .webp({ quality: asset.quality, alphaQuality: 90 })
    .toFile(outPath)
  const kb = (info.size / 1024).toFixed(0)
  const mbIn = ((await (await import("node:fs/promises")).stat(asset.master)).size / 1024).toFixed(0)
  console.log(`${asset.label}: ${meta.width}x${meta.height} -> ${info.width}x${info.height}, ${mbIn} KB -> ${kb} KB webp`)
}
