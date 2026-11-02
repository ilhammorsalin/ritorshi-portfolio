"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

import { cn } from "@/lib/utils"

export type ShowcaseMedia = {
  type: "video" | "image"
  src: string
  poster?: string
  variant?: string
}

export type ShowcaseProject = {
  slug: string
  title: string
  description?: string | null
  media: ShowcaseMedia[]
}

type Props = {
  title: string
  projects: ShowcaseProject[]
  /** Show variant chips in the carousel (Graphic Design categories). */
  chips?: boolean
}

// Reuses the hand-drawn arrow PNGs from the home testimonials section.
function ArrowButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "left" | "right"
  disabled?: boolean
  onClick: () => void
}) {
  const [pressed, setPressed] = useState(false)
  const key = direction === "left" ? "left" : "right"
  return (
    <button
      type="button"
      aria-label={direction === "left" ? "Previous item" : "Next item"}
      disabled={disabled}
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      className="relative h-10 w-10 shrink-0 disabled:opacity-30 sm:h-14 sm:w-14"
    >
      <Image
        src={`/testimonials/arrow-${key}${pressed && !disabled ? "-clicked" : ""}.png`}
        alt=""
        fill
        sizes="56px"
        className="object-contain drop-shadow-[0_6px_10px_rgba(0,0,0,0.45)]"
      />
    </button>
  )
}

function MediaTile({ media }: { media: ShowcaseMedia }) {
  const [playing, setPlaying] = useState(false)

  if (media.type === "image") {
    return (
      <div className="relative h-full w-full">
        <Image
          src={media.src}
          alt=""
          fill
          sizes="(min-width:1024px) 58vw, 92vw"
          className="object-contain"
        />
      </div>
    )
  }

  return (
    <div className="relative h-full w-full">
      {playing ? (
        <video
          src={media.src}
          controls
          autoPlay
          preload="none"
          poster={media.poster}
          className="h-full w-full object-contain"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group relative block h-full w-full"
        >
          {media.poster ? (
            <Image
              src={media.poster}
              alt=""
              fill
              sizes="(min-width:1024px) 58vw, 92vw"
              className="object-contain"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center border border-dashed border-purple-400/50 bg-purple-600/30 text-[11px] font-semibold tracking-[0.18em] text-purple-50 uppercase">
              Poster Missing
            </div>
          )}
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 font-marker text-lg text-white transition group-hover:scale-110 group-hover:bg-black/85">
            ▶
          </span>
        </button>
      )}
    </div>
  )
}

function ProjectSection({
  project,
  chips,
  title,
}: {
  project: ShowcaseProject
  chips: boolean
  title: string
}) {
  const variants = [...new Set(project.media.map((m) => m.variant))].filter(
    Boolean
  ) as string[]
  const [current, setCurrent] = useState(0)
  const [chip, setChip] = useState<string>("All")
  const [open, setOpen] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  const items = chips
    ? project.media.filter((m) => chip === "All" || m.variant === chip)
    : project.media

  const goTo = (index: number) => {
    const el = trackRef.current
    if (!el || !el.children[index]) return
    const clamped = Math.max(0, Math.min(items.length - 1, index))
    const tile = el.children[clamped] as HTMLElement
    el.scrollTo({ left: tile.offsetLeft - el.offsetLeft, behavior: "smooth" })
    setCurrent(clamped)
  }

  const onTrackScroll = () => {
    const el = trackRef.current
    if (!el || el.clientWidth === 0) return
    const index = Math.round(el.scrollLeft / el.clientWidth)
    setCurrent(Math.max(0, Math.min(items.length - 1, index)))
  }

  const itemsLabel = `${items.length} ${items.length === 1 ? "piece" : "pieces"}`

  return (
    <section
      aria-label={project.title}
      className="relative flex h-svh snap-start items-center justify-center px-4 py-24 sm:px-10"
    >
      {/* Desktop: 60/40 split. Mobile: media full width, text floats in. */}
      <div className="flex h-full w-full max-w-6xl items-center gap-8">
        <div className="-rotate-1 flex h-full w-full flex-col justify-center lg:w-[60%]">
          {chips && variants.length > 0 ? (
            <div className="mb-3 flex flex-wrap justify-center gap-3">
              {["All", ...variants].map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    setChip(label)
                    trackRef.current?.scrollTo({ left: 0 })
                    setCurrent(0)
                  }}
                  className={cn(
                    "rounded-full border border-white/30 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase transition",
                    chip === label
                      ? "bg-white text-zinc-900"
                      : "text-white/80 hover:bg-white/10"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          ) : null}

          <div
            ref={trackRef}
            onScroll={onTrackScroll}
            className="flex h-full flex-1 overflow-x-auto overflow-hidden rounded-xl bg-white/[0.04] shadow-[0_18px_40px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur-sm snap-x snap-mandatory"
          >
            {items.map((item, i) => (
              <div
                key={`${item.src}-${i}`}
                className="h-full w-full shrink-0 p-4 sm:p-8 snap-center"
              >
                <MediaTile media={item} />
              </div>
            ))}
          </div>

          {items.length > 1 ? (
            <div className="mt-3 flex items-center justify-center gap-4">
              <ArrowButton
                direction="left"
                disabled={current === 0}
                onClick={() => goTo(current - 1)}
              />
              <span className="font-marker text-lg text-white/80">
                {current + 1} of {items.length}
              </span>
              <ArrowButton
                direction="right"
                disabled={current === items.length - 1}
                onClick={() => goTo(current + 1)}
              />
            </div>
          ) : null}
        </div>

        <div
          className={cn(
            "absolute inset-x-6 top-16 bottom-20 z-40 flex-col overflow-y-auto rounded-xl bg-zinc-900/95 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.6)] backdrop-blur lg:static lg:inset-auto lg:z-auto lg:flex lg:h-full lg:w-[40%] lg:rotate-1 lg:bg-white/[0.04] lg:p-8 lg:shadow-[0_18px_40px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.08)] lg:backdrop-blur-sm",
            open ? "flex" : "hidden"
          )}
        >
          <h2 className="font-marker text-3xl leading-tight break-words text-white sm:text-4xl">
            {project.title}
          </h2>
          <p className="mt-2 text-[10px] font-semibold tracking-[0.25em] text-zinc-400 uppercase">
            {title ? `${title} — ` : ""}
            {itemsLabel}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-300">
            {project.description ??
              "Description coming soon — the work speaks first."}
          </p>
        </div>
      </div>

      {/* Mobile-only text panel toggle */}
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="absolute right-4 bottom-6 z-50 rounded-full bg-white px-4 py-2 text-[10px] font-semibold tracking-[0.18em] text-zinc-900 uppercase shadow-[0_10px_20px_rgba(0,0,0,0.5)] lg:hidden"
      >
        {open ? "Close" : "Info"}
      </button>
    </section>
  )
}

export default function ProjectShowcase({
  title,
  projects,
  chips = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  // Vertical scroll-snap sync: observer picks the section in view and drives
  // the story-dots nav (counter + jump list).
  useEffect(() => {
    const root = containerRef.current
    if (!root) return
    const sections = Array.from(
      root.querySelectorAll<HTMLElement>("[data-index]")
    )
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.getAttribute("data-index")))
          }
        }
      },
      { root, threshold: 0.55 }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [projects.length])

  const jumpTo = (index: number) => {
    containerRef.current
      ?.querySelector<HTMLElement>(`[data-index="${index}"]`)
      ?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="relative h-svh overflow-hidden text-zinc-100">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/space-bg.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>

      <div
        ref={containerRef}
        className="h-svh snap-y snap-mandatory overflow-y-scroll"
      >
        {projects.map((project, index) => (
          <div key={project.slug} data-index={index}>
            <ProjectSection project={project} chips={chips} title={title} />
          </div>
        ))}
      </div>

      <Link
        href="/"
        className="absolute top-4 left-4 z-50 text-xs text-white/70 underline-offset-4 hover:text-white hover:underline"
      >
        ← Back
      </Link>
      <h1 className="absolute top-4 left-1/2 z-40 -translate-x-1/2 font-marker text-lg text-white/80 sm:text-xl">
        {title}
      </h1>

      {projects.length > 1 ? (
        <nav
          aria-label={`${title} project navigation`}
          className="absolute top-1/2 right-3 z-50 flex -translate-y-1/2 flex-col items-center gap-2 sm:right-5"
        >
          <span className="font-marker text-sm text-white/70">
            {active + 1} of {projects.length}
          </span>
          {projects.map((project, index) => (
            <button
              key={project.slug}
              type="button"
              aria-label={project.title}
              aria-current={active === index}
              onClick={() => jumpTo(index)}
              className={cn(
                "h-3 w-3 rounded-full border border-white/50 transition",
                active === index ? "scale-110 bg-white" : "bg-white/20"
              )}
            />
          ))}
        </nav>
      ) : null}
    </main>
  )
}
