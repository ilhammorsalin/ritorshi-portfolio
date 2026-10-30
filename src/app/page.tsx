"use client"

import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Text } from "@/components/ui/typography"
import { cn } from "@/lib/utils"

const headingClass =
  "font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl"

const shellClass = "mx-auto w-full max-w-5xl px-6"

const work = [
  {
    label: "Graphic Design",
    src: "/work/sketchbook.png",
    width: 601,
    height: 596,
    className: "-rotate-6",
  },
  {
    label: "Animation",
    src: "/work/crt.png",
    width: 2066,
    height: 2048,
    className: "rotate-3",
  },
  {
    label: "Films",
    src: "/work/camera.png",
    width: 2066,
    height: 2048,
    className: "-rotate-2",
  },
]

const tools = [
  { label: "Photoshop", src: "/about/ps.png", width: 147, height: 146 },
  { label: "Animate", src: "/about/an.png", width: 136, height: 134 },
  { label: "Premiere Pro", src: "/about/pr.png", width: 142, height: 139 },
  { label: "Figma", src: "/about/figma.png", width: 90, height: 121 },
]

const story = [
  "I am a designer and animator who got here by making things for friends for free until the requests stopped being favours. My first logo was drawn in a notebook, scanned badly, and used anyway. That project taught me more than any tutorial, mainly that a clear idea beats a clean file every time.",
  "These days I move between brand work, motion design and short films. I like the part where a brief is still vague and nothing has been decided yet, and I like the part where it all lines up. The middle is mostly coffee, timelines and quiet problem solving.",
  "Outside of client work I keep a sketchbook of unfinished scenes and a growing folder of sounds I will use eventually. If you want to talk shop about type, timing or why a certain transition feels right, I will happily derail a conversation for an hour.",
]

export default function Page() {
  return (
    <main className="relative min-h-svh overflow-x-hidden">
      {/* Backdrop lives in the document, so it scrolls 1:1 with the page. */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/space-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>

      {/* 1. Hero */}
      <section
        aria-labelledby="hero-heading"
        className="flex min-h-screen items-center justify-center px-6 py-24"
      >
        <h1 id="hero-heading" className="sr-only">
          Ritorshi&rsquo;s Studio
        </h1>
        <Image
          src="/hero-text.png"
          alt=""
          width={1019}
          height={429}
          priority
          className="h-auto w-full max-w-3xl -rotate-2"
        />
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
          <div className="flex min-h-72 items-center justify-center border border-dashed border-purple-400/50 bg-purple-600/40 p-4 text-center text-[11px] font-semibold tracking-[0.18em] text-purple-50 uppercase lg:min-h-[26rem]">
            Process Image Placeholder
          </div>
        </div>
      </section>

      {/* 3. My Work */}
      <section aria-labelledby="work-heading" className="py-24 sm:py-32">
        <div className={shellClass}>
          <h2 id="work-heading" className={cn(headingClass, "text-center")}>
            My Work
          </h2>
          <ul className="mt-14 flex flex-col items-center justify-center gap-14 sm:flex-row sm:items-start sm:justify-between sm:gap-10 lg:gap-16">
            {work.map((item) => (
              <li
                key={item.label}
                className={cn(
                  "flex w-56 shrink-0 flex-col items-center",
                  item.className
                )}
              >
                <Image
                  src={item.src}
                  alt=""
                  width={item.width}
                  height={item.height}
                  sizes="240px"
                  className="h-44 w-auto object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.45)]"
                />
                <span className="mt-4 text-[11px] font-semibold tracking-[0.18em] uppercase">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. About Me */}
      <section aria-labelledby="about-heading" className="py-24 sm:py-32">
        <div className={shellClass}>
          <h2 id="about-heading" className="sr-only">
            Here&rsquo;s Why I Am The Main Character
          </h2>
          <div className="sr-only">
            {story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Full-bleed: the heading art and the story art span the viewport edge to edge. */}
          <div className="flex w-full flex-col items-center gap-10">
            <Image
              src="/main-char.svg"
              alt=""
              width={932}
              height={810}
              unoptimized
              className="h-auto w-full"
            />
            <div className="relative w-full">
              <Image
                src="/about/full-text.png"
                alt=""
                width={1164}
                height={1986}
                className="h-auto w-full"
              />
              {/* Sits in the gap under the "I kick ass at" line of the artwork. */}
              <ul className="absolute inset-x-0 top-[67%] flex items-center justify-center gap-4 sm:gap-5">
                {tools.map((tool, index) => (
                  <li key={tool.label}>
                    <Image
                      src={tool.src}
                      alt={tool.label}
                      width={tool.width}
                      height={tool.height}
                      sizes="56px"
                      className={cn(
                        "h-11 w-auto drop-shadow-[0_6px_10px_rgba(0,0,0,0.45)] sm:h-12",
                        index % 2 === 0 ? "-rotate-6" : "rotate-6"
                      )}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={cn(shellClass, "mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-8")}>
            <Image
              src="/about/red-banner.png"
              alt=""
              width={531}
              height={354}
              className="h-20 w-auto -rotate-3 sm:h-24"
            />
            <Image
              src="/about/polaroid-1.png"
              alt=""
              width={495}
              height={603}
              className="w-28 rotate-6 sm:w-32"
            />
            <Image
              src="/about/yellow-banner.png"
              alt=""
              width={799}
              height={281}
              className="h-16 w-auto -rotate-2 sm:h-20"
            />
          </div>
      </section>

      {/* 5. Testimonials */}
      <section aria-labelledby="testimonials-heading" className="py-24 sm:py-32">
        <div className={shellClass}>
          <h2 id="testimonials-heading" className="sr-only">
            Testimonials
          </h2>
          <Image
            src="/testimonials.png"
            alt=""
            width={1199}
            height={230}
            className="mx-auto h-auto w-full max-w-md -rotate-1"
          />

          <div className="relative mx-auto mt-12 max-w-4xl border-4 border-zinc-700 bg-zinc-900/90 p-6 shadow-2xl sm:p-10">
            <span className="absolute top-2 left-3 text-[10px] tracking-[0.25em] text-zinc-500 uppercase">
              TV monitor placeholder
            </span>
            <div className="grid gap-8 pt-4 md:grid-cols-2 md:items-center">
              <div>
                <blockquote className="font-heading text-xl leading-relaxed text-zinc-100 sm:text-2xl">
                  &ldquo;Ritorshi took a half-formed idea and came back with
                  something we could actually launch. Clear communication, no
                  drama, and the final cut landed days early.&rdquo;
                </blockquote>
                <Text
                  variant="small"
                  className="mt-6 tracking-widest text-zinc-400 uppercase"
                >
                  Demo Client &mdash; Brand Team
                </Text>
              </div>
              <div className="flex aspect-square w-full max-w-xs items-center justify-center justify-self-center border border-dashed border-zinc-400/40 bg-zinc-600/25 p-4 text-center text-[11px] font-semibold tracking-[0.18em] text-zinc-100 uppercase">
                Testimonial Image Placeholder
              </div>
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
            <p className="text-[10px] tracking-[0.25em] text-zinc-500 uppercase">
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
            className="text-xs text-white/70 underline-offset-4 hover:text-white hover:underline"
          >
            Experiments
          </Link>
        </div>
      </footer>
    </main>
  )
}
