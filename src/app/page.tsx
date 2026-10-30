"use client"

import Link from "next/link"
import Image from "next/image"

import { useEffect, useRef } from "react"
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Text } from "@/components/ui/typography"
import { cn } from "@/lib/utils"

const headingClass =
  "font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl"

const shellClass = "mx-auto w-full max-w-5xl px-6"

const placeholderTones = {
  violet: "border-violet-400/40 bg-violet-500/25 text-violet-50",
  purple: "border-purple-400/50 bg-purple-600/40 text-purple-50",
  amber: "border-amber-400/40 bg-amber-500/25 text-amber-50",
  sky: "border-sky-400/40 bg-sky-500/25 text-sky-50",
  rose: "border-rose-400/40 bg-rose-500/25 text-rose-50",
  zinc: "border-zinc-400/30 bg-zinc-600/25 text-zinc-100",
} as const

type Tone = keyof typeof placeholderTones

function Placeholder({
  label,
  tone,
  className,
}: {
  label: string
  tone: Tone
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center border border-dashed p-4 text-center text-[11px] font-semibold tracking-[0.18em] uppercase",
        placeholderTones[tone],
        className
      )}
    >
      <span className="text-balance">{label}</span>
    </div>
  )
}

// Swap-ready: every label, tone and size lives here, so replacing a block with
// real art only touches this object and the matching component props.
const placeholders = {
  hero: {
    label: "Ritorshi's Studio SVG Text Placeholder",
    tone: "violet" as Tone,
    className: "h-56 w-full max-w-3xl sm:h-64 md:h-72",
  },
  process: {
    label: "Process Image Placeholder",
    tone: "purple" as Tone,
    className: "min-h-72 w-full lg:min-h-[26rem]",
  },
  work: [
    {
      label: "Graphic Design",
      tone: "amber" as Tone,
      className: "h-40 w-56 -rotate-6 sm:-mr-6 sm:w-60",
    },
    {
      label: "Animation",
      tone: "sky" as Tone,
      className: "h-40 w-56 rotate-3 sm:-mr-6 sm:w-60",
    },
    {
      label: "Films",
      tone: "rose" as Tone,
      className: "h-40 w-56 -rotate-2 sm:w-60",
    },
  ],
  software: [
    { label: "Ps", tone: "zinc" as Tone, className: "size-16 p-1 text-[10px] tracking-wider" },
    { label: "Ae", tone: "zinc" as Tone, className: "size-16 p-1 text-[10px] tracking-wider" },
    { label: "Pr", tone: "zinc" as Tone, className: "size-16 p-1 text-[10px] tracking-wider" },
    { label: "Blender", tone: "zinc" as Tone, className: "size-16 p-1 text-[10px] tracking-wider" },
  ],
  polaroids: [
    {
      label: "Polaroid PNG 1",
      tone: "rose" as Tone,
      className: "size-40 rotate-6 sm:size-44 lg:size-52",
    },
    {
      label: "Polaroid PNG 2",
      tone: "sky" as Tone,
      className: "size-40 -rotate-6 sm:size-44 lg:size-52",
    },
  ],
  testimonialImage: {
    label: "Testimonial Image Placeholder",
    tone: "zinc" as Tone,
    className: "aspect-square w-full max-w-xs justify-self-center",
  },
}

// The artwork is a tall portrait image, so it is drawn at its native aspect
// (full viewport width) and scrolled through the fixed viewport window. This is
// the one number that has to stay in sync with the file at /public/space-bg.png.
const BACKDROP_ASPECT = "1125 / 6272"

export default function Page() {
  const backdropRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  // Distance the layer can travel before its bottom edge meets the viewport
  // bottom. Measured rather than assumed, so the backdrop never exposes a gap
  // and the whole image is seen once over the length of the page.
  const travel = useMotionValue(0)
  const y = useTransform(
    [scrollYProgress, travel],
    ([progress, distance]: number[]) => -progress * distance
  )

  useEffect(() => {
    const layer = backdropRef.current
    if (!layer) return

    const measure = () => {
      travel.set(Math.max(0, layer.offsetHeight - window.innerHeight))
    }

    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(layer)

    return () => observer.disconnect()
  }, [travel])

  return (
    <main className="relative min-h-svh overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          ref={backdropRef}
          style={{ y, aspectRatio: BACKDROP_ASPECT }}
          className="absolute inset-x-0 top-0 min-h-full"
        >
          <Image
            src="/space-bg.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* 1. Hero */}
      <section
        aria-labelledby="hero-heading"
        className="flex min-h-screen items-center justify-center px-6 py-24"
      >
        <h1 id="hero-heading" className="sr-only">
          Ritorshi&rsquo;s Studio
        </h1>
        <Placeholder {...placeholders.hero} />
      </section>

      {/* 2. Process */}
      <section aria-labelledby="process-heading" className="py-24 sm:py-32">
        <div className={cn(shellClass, "grid items-center gap-12 lg:grid-cols-2")}>
          <div>
            <h2 id="process-heading" className={headingClass}>
              Follow How I Get My Work Done
            </h2>
            <div className="mt-6 space-y-4">
              <Text>
                Every project starts with a conversation and a messy page of
                notes. I map out the story first, then sketch the frames, then
                pick the tools that suit it. Nothing gets polished until the
                structure holds up on its own.
              </Text>
              <Text>
                Drafts are shared early and often, because feedback is cheaper
                before the render farm gets involved. Colour, timing and type
                get tested in small loops: a single frame, a five-second loop, a
                short cut. If it does not read clearly at that scale, it will
                not read clearly at the end.
              </Text>
              <Text>
                The last pass is where the work earns its keep. I clean up
                curves, tighten audio cues and export versions that fit each
                destination, from a vertical teaser to a full wide cut. Then the
                files go out with everything labelled so nobody has to guess
                what they are looking at.
              </Text>
            </div>
          </div>
          <Placeholder {...placeholders.process} />
        </div>
      </section>

      {/* 3. My Work */}
      <section aria-labelledby="work-heading" className="py-24 sm:py-32">
        <div className={shellClass}>
          <h2 id="work-heading" className={cn(headingClass, "text-center")}>
            My Work
          </h2>
          <div className="mt-14 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-0">
            {placeholders.work.map((item) => (
              <Placeholder key={item.label} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. About Me */}
      <section aria-labelledby="about-heading" className="py-24 sm:py-32">
        <div className={shellClass}>
          <div className="relative">
            <div className="lg:max-w-[64%]">
              <h2 id="about-heading" className={headingClass}>
                Here&rsquo;s Why I Am The Main Character
              </h2>
              <div className="mt-6 space-y-4">
                <Text>
                  I am a designer and animator who got here by making things for
                  friends for free until the requests stopped being favours. My
                  first logo was drawn in a notebook, scanned badly, and used
                  anyway. That project taught me more than any tutorial, mainly
                  that a clear idea beats a clean file every time.
                </Text>
                <Text>
                  These days I move between brand work, motion design and short
                  films. I like the part where a brief is still vague and
                  nothing has been decided yet, and I like the part where it all
                  lines up. The middle is mostly coffee, timelines and quiet
                  problem solving.
                </Text>
                <Text>
                  Outside of client work I keep a sketchbook of unfinished
                  scenes and a growing folder of sounds I will use eventually.
                  If you want to talk shop about type, timing or why a certain
                  transition feels right, I will happily derail a conversation
                  for an hour.
                </Text>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Text variant="small" className="mr-1 uppercase tracking-widest text-muted-foreground">
                  Tools
                </Text>
                {placeholders.software.map((item) => (
                  <Placeholder key={item.label} {...item} />
                ))}
              </div>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-6 lg:mt-0 lg:contents">
              {placeholders.polaroids.map((item, index) => (
                <Placeholder
                  key={item.label}
                  {...item}
                  className={cn(
                    item.className,
                    index === 0
                      ? "lg:absolute lg:top-2 lg:right-2"
                      : "lg:absolute lg:right-36 lg:bottom-6"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section aria-labelledby="testimonials-heading" className="py-24 sm:py-32">
        <div className={shellClass}>
          <h2
            id="testimonials-heading"
            className={cn(headingClass, "text-center")}
          >
            Testimonials
          </h2>
          <div className="relative mx-auto mt-14 max-w-4xl border-4 border-zinc-700 bg-zinc-900/90 p-6 shadow-2xl sm:p-10">
            <span className="absolute top-2 left-3 text-[10px] tracking-[0.25em] uppercase text-zinc-500">
              TV monitor placeholder
            </span>
            <div className="grid gap-8 pt-4 md:grid-cols-2 md:items-center">
              <div>
                <blockquote className="font-heading text-xl leading-relaxed text-zinc-100 sm:text-2xl">
                  &ldquo;Ritorshi took a half-formed idea and came back with
                  something we could actually launch. Clear communication, no
                  drama, and the final cut landed days early.&rdquo;
                </blockquote>
                <Text variant="small" className="mt-6 uppercase tracking-widest text-zinc-400">
                  Demo Client &mdash; Brand Team
                </Text>
              </div>
              <Placeholder {...placeholders.testimonialImage} />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Contact Me */}
      <section aria-labelledby="contact-heading" className="py-24 sm:py-32">
        <div className={shellClass}>
          <h2 id="contact-heading" className={cn(headingClass, "text-center")}>
            Contact Me
          </h2>
          <div className="mx-auto mt-14 max-w-3xl bg-[#f3e8d3] p-6 text-zinc-900 sm:p-10">
            <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-500">
              Parchment placeholder
            </p>
            <form
              className="mt-6 space-y-5"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="space-y-2">
                <Label htmlFor="contact-name" className="text-zinc-700">
                  Name
                </Label>
                <Input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  placeholder="Your name"
                  className="border-zinc-400 bg-white/70 text-zinc-900 placeholder:text-zinc-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email" className="text-zinc-700">
                  Email
                </Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="border-zinc-400 bg-white/70 text-zinc-900 placeholder:text-zinc-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-message" className="text-zinc-700">
                  Message
                </Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell me about the project"
                  className="min-h-32 border-zinc-400 bg-white/70 text-zinc-900 placeholder:text-zinc-500"
                />
              </div>
              <Button
                type="button"
                className="w-full bg-zinc-900 text-zinc-50 hover:bg-zinc-800 sm:w-auto"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8">
        <div className={cn(shellClass, "text-center")}>
          <Link
            href="/exp"
            className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Experiments
          </Link>
        </div>
      </footer>
    </main>
  )
}
