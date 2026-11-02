/**
 * Portfolio asset preparer.
 *
 * Usage: node scripts/prepare-portfolio-assets.mjs [section ...]
 *        sections: animation films graphic-design (default: all)
 *
 * Workflow: masters live in Assets/Portfolio/<Section>/ (never imported), this
 * script processes them and emits /public/<section>/<slug>/. It also (re)writes
 * the typed data files in src/data/portfolio/. Videos are re-encoded (size cap)
 * and get an auto-extracted poster frame when they don't have one.
 */
import { execFileSync } from "node:child_process"
import { createWriteStream, existsSync } from "node:fs"
import { mkdir, readdir, rm, stat, writeFile } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const ROOT = process.cwd()
const SRC_ROOT = path.join(ROOT, "Assets", "Portfolio")
const OUT_ROOT = path.join(ROOT, "public")
const DATA_ROOT = path.join(ROOT, "src", "data", "portfolio")

const VIDEO_REENCODE_BYTES = 60 * 1024 * 1024 // >60MB gets re-encoded
const MAX_IMG_W = 1600
const MAX_POSTER_W = 1600

const SECTIONS = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ["animation", "films", "graphic-design"]

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/['’".,()[\]]+/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

const titleCase = (s) =>
  s
    .replace(/[_-]+/g, " ")
    .replace(/\.(mp4|png|jpe?g|webp)$/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ")

const mediaType = (file) => (/\.(mp4|mov|webm)$/i.test(file) ? "video" : "image")

// ---- section definitions ----------------------------------------------------
// Each maps source folder(s) to { slug, title, media[], variants{} }. Videos at
// the top level of Animations/Cinematography are one project each; Graphic
// Design artworks/<folder>/ are one project each (subfolders = variant chips).
async function collect(section) {
  if (section === "animation" || section === "films") {
    const dir =
      section === "animation" ? "Animations" : "Cinematography"
    const base = path.join(SRC_ROOT, dir)
    const projects = []
    const visit = async (sub, titlePrefix = "") => {
      const entries = await readdir(sub, { withFileTypes: true })
      const dirs = entries
        .filter((e) => e.isDirectory())
        .sort((a, b) => a.name.localeCompare(b.name))
      const videos = entries.filter((e) => /\.(mp4|mov|webm)$/i.test(e.name))
      const covers = entries.filter((e) => /\.(png|jpe?g|webp)$/i.test(e.name))
      for (const video of videos.sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { numeric: true })
      )) {
        // An image named after the video (e.g. "ADFAS Trailer Cover.png") is
        // its cover art; pair them instead of frame-grabbing.
        const stem = video.name.replace(/\.[^.]+$/, "")
        const cover = covers.find((c) =>
          c.name.toLowerCase().startsWith(stem.toLowerCase())
        )
        const rel = path.relative(base, sub)
        const slug = slugify([...rel.split(path.sep), stem].join("-"))
        projects.push({
          slug,
          title: `${titlePrefix}${titleCase(stem)}`.trim(),
          media: [
            {
              type: "video",
              src: `/${section}/${slug}/clip-1.mp4`,
              poster: `/${section}/${slug}/poster-1.webp`,
              coverMaster: cover ? path.join(sub, cover.name) : null,
              videoMaster: path.join(sub, video.name),
            },
          ],
        })
      }
      for (const dir of dirs) {
        await visit(path.join(sub, dir.name), `${titlePrefix}${titleCase(dir.name)} — `)
      }
    }
    await visit(base)
    return projects
  }

  if (section === "graphic-design") {
    const base = path.join(SRC_ROOT, "Graphic Design")
    const projects = []

    // One project per top-level folder; its images go first with variant
    // null, then each immediate subfolder is a variant chip (nested folders
    // of a variant are flattened into it — never separate projects).
    const mkProject = async (dir) => {
      const entries = await readdir(dir, { withFileTypes: true })
      // A PDF at the project root is the artist's own description of the work.
      const pdf = entries
        .map((e) => e.name)
        .filter((name) => /\.pdf$/i.test(name))
        .sort((a, b) =>
          b.startsWith(path.basename(dir)) - a.startsWith(path.basename(dir))
        )[0]
      const description = pdf
        ? (await new Promise((resolve) => {
            try {
              resolve(
                execFileSync("pdftotext", ["-q", "-raw", path.join(dir, pdf), "-"], {
                  maxBuffer: 1024 * 1024,
                })
                  .toString()
                  .replace(/\s+/g, " ")
                  .trim()
                  .slice(0, 1200)
              )
            } catch {
              resolve(null)
            }
          })) || null
        : null
      const images = entries
        .filter((e) => /\.(png|jpe?g|webp)$/i.test(e.name))
        .sort((a, b) =>
          a.name.localeCompare(b.name, undefined, { numeric: true })
        )
      const variantDirs = entries
        .filter((e) => e.isDirectory())
        .sort((a, b) => a.name.localeCompare(b.name))
      const theme = titleCase(path.basename(dir))
      // Top-level folder names are unique across the section already, so no
      // prefixing — prevents "traditional-drawings" from doubling up.
      const slug = slugify(path.basename(dir))
      const media = []
      const addImages = async (folder, variant, list) => {
        for (const img of list) {
          media.push({
            type: "image",
            src: "",
            variant,
            master: path.join(folder, img.name),
          })
        }
      }
      await addImages(dir, null, images)
      for (const vd of variantDirs) {
        // Flatten nested variant folders; keep their images in with the same
        // chip label, ordered by path then name.
        const stack = [vd.name]
        while (stack.length) {
          const rel = stack.shift()
          const folder = path.join(dir, rel)
          const r = await readdir(folder, { withFileTypes: true })
          await addImages(
            folder,
            titleCase(vd.name),
            r
              .filter((e) => /\.(png|jpe?g|webp)$/i.test(e.name))
              .sort((a, b) =>
                a.name.localeCompare(b.name, undefined, { numeric: true })
              )
          )
          for (const e of r.filter((e) => e.isDirectory()).sort((a, b) =>
            a.name.localeCompare(b.name)
          )) {
            stack.unshift(path.join(rel, e.name))
          }
        }
      }
      // Number images now that ordering is final.
      media.forEach((m, i) => {
        m.src = `/${section}/${slug}/img-${i + 1}.webp`
      })
      if (media.length) {
        projects.push({
          slug,
          title: theme,
          description,
          media,
        })
      }
    }

    const artworksDir = path.join(base, "artworks")
    const dirs = (await readdir(artworksDir, { withFileTypes: true }))
      .filter((e) => e.isDirectory())
      .sort((a, b) => a.name.localeCompare(b.name))
    for (const dir of dirs) {
      await mkProject(path.join(artworksDir, dir.name), "")
    }
    await mkProject(
      path.join(base, "Traditional Drawings"),
      ""
    )
    return projects
  }

  throw new Error(`Unknown section: ${section}`)
}

// ---- processing -------------------------------------------------------------
function ffmpeg(args) {
  execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", ...args])
}

async function run() {
  const log = createWriteStream(path.join(ROOT, "assets-prep.log"))
  const say = (m) => {
    console.log(m)
    log.write(m + "\n")
  }

  for (const section of SECTIONS) {
    const projects = await collect(section)
    const outDir = path.join(OUT_ROOT, section)
    await rm(outDir, { recursive: true, force: true })

    for (const project of projects) {
      const dir = path.join(OUT_ROOT, section, project.slug)
      await mkdir(dir, { recursive: true })

      let clip = 0
      if (section !== "graphic-design") {
        for (const m of project.media) {
          if (m.type !== "video") continue
          clip += 1
          const clipPath = path.join(dir, `clip-${clip}.mp4`)
          const posterPath = path.join(dir, `poster-${clip}.webp`)
          const size = (await stat(m.videoMaster)).size
          if (size > VIDEO_REENCODE_BYTES) {
            say(`${project.slug}: re-encoding ${path.basename(m.videoMaster)} (${Math.round(size / 1e6)}MB)`)
            ffmpeg([
              "-i", m.videoMaster,
              "-c:v", "libx264", "-preset", "veryfast", "-crf", "23",
              "-vf", "scale=-2:'min(ih,1080)'",
              "-c:a", "aac", "-b:a", "128k",
              "-movflags", "+faststart",
              "-y", clipPath,
            ])
            say(`${project.slug}: clip -> ${Math.round((await stat(clipPath)).size / 1e6)}MB`)
          } else {
            ffmpeg(["-i", m.videoMaster, "-c", "copy", "-y", clipPath])
          }

          if (m.coverMaster) {
            // Cover art provided by the artist — resize instead of frame-grab.
            await sharp(m.coverMaster)
              .resize({ width: MAX_POSTER_W, withoutEnlargement: true })
              .webp({ quality: 80 })
              .toFile(posterPath)
          } else {
            const tmp = path.join(dir, "poster.png")
            ffmpeg(["-ss", "1", "-i", clipPath, "-frames:v", "1", "-y", tmp])
            await sharp(tmp).webp({ quality: 80 }).toFile(posterPath)
            await rm(tmp)
          }
          m.src = `/${section}/${project.slug}/clip-${clip}.mp4`
          m.poster = `/${section}/${project.slug}/poster-${clip}.webp`
        }
      }

      let img = 0
      for (const m of project.media) {
        if (m.type !== "image") continue
        img += 1
        const out = path.join(dir, `img-${img}.webp`)
        await sharp(m.master)
          .resize({ width: MAX_IMG_W, withoutEnlargement: true })
          .webp({ quality: 82 })
          .toFile(out)
        m.src = `/${section}/${project.slug}/img-${img}.webp`
      }

      for (const m of project.media) {
        delete m.master
        delete m.coverMaster
        delete m.videoMaster
      }
      say(`${project.slug}: ${project.media.length} media item(s)`)
    }

    // ---- data file -----------------------------------------------------------
    const dataPath = path.join(DATA_ROOT, `${section}.ts`)
    await mkdir(path.dirname(dataPath), { recursive: true })
    const body = projects
      .map((p) => {
        const media = p.media
          .map((m) => {
            const parts = [
              `type: "${m.type}"`,
              `src: "${m.src}"`,
              m.poster ? `poster: "${m.poster}"` : null,
              m.variant ? `variant: "${m.variant}"` : null,
            ].filter(Boolean)
            return `{ ${parts.join(", ")} }`
          })
          .join(",\n      ")
        return `    {\n      slug: "${p.slug}",\n      title: ${JSON.stringify(p.title)},\n      description: ${JSON.stringify(p.description ?? null)},\n      media: [\n      ${media},\n      ],\n    }`
      })
      .join(",\n")
    await writeFile(
      dataPath,
      `// Generated by scripts/prepare-portfolio-assets.mjs — edit freely; the\n// script only overwrites this when it re-runs.\nexport type PortfolioMedia = {\n  type: "video" | "image"\n  src: string\n  poster?: string\n  variant?: string\n}\n\nexport type PortfolioProject = {\n  slug: string\n  title: string\n  description?: string | null\n  media: PortfolioMedia[]\n}\n\nexport const projects: PortfolioProject[] = [\n${body},\n]\n`
    )
    say(`${section}: ${projects.length} projects -> ${path.relative(ROOT, dataPath)}`)
  }
}

await run()
