"use client"

import { useState } from "react"

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
    href: "/graphics-design",
    src: "/sketchbook.webp",
    width: 512,
    height: 508,
    className: "-rotate-6",
  },
  {
    label: "Animation",
    href: "/animations",
    src: "/crt.webp",
    width: 512,
    height: 508,
    className: "rotate-3",
  },
  {
    label: "Films",
    href: "/cinematography",
    src: "/camera.webp",
    width: 512,
    height: 508,
    className: "-rotate-2",
  },
]

// Demo testimonial slides reuse the work images until real client shots exist.
const testimonials = [
  {
    ...work[0],
    quote:
      "Ritorshi took a half-formed idea and came back with something we could actually launch. Clear communication, no drama, and the final cut landed days early.",
    client: "Demo Client — Brand Team",
  },
  {
    ...work[1],
    quote:
      "The animation work landed on time and made the whole campaign feel alive. Every revision was handled without drama.",
    client: "Demo Client — Studio Lead",
  },
  {
    ...work[2],
    quote:
      "We came in with a rough idea and left with a short film that felt like us. The process was clear from start to finish.",
    client: "Demo Client — Film Producer",
  },
]

// Softly curved, scattered row of tool icons under "i Kick Ass At".
const tools = [
  { label: "Photoshop", src: "/about/ps.png", width: 147, height: 146, className: "h-12 -translate-y-1 -rotate-6 sm:h-14" },
  { label: "Animate", src: "/about/an.png", width: 136, height: 134, className: "h-14 translate-y-1 rotate-6 sm:h-16" },
  { label: "Premiere Pro", src: "/about/pr.png", width: 142, height: 139, className: "h-12 -rotate-3 sm:h-14" },
  { label: "Figma", src: "/about/figma.png", width: 90, height: 121, className: "h-12 -translate-y-2 rotate-3 sm:h-14" },
  { label: "Blender", src: "/about/blender.png", width: 330, height: 270, className: "h-12 translate-y-4 -rotate-6 sm:h-14 sm:ml-10" },
]

const story = [
  "I am a designer and animator who got here by making things for friends for free until the requests stopped being favours. My first logo was drawn in a notebook, scanned badly, and used anyway. That project taught me more than any tutorial, mainly that a clear idea beats a clean file every time.",
  "These days I move between brand work, motion design and short films. I like the part where a brief is still vague and nothing has been decided yet, and I like the part where it all lines up. The middle is mostly coffee, timelines and quiet problem solving.",
  "Outside of client work I keep a sketchbook of unfinished scenes and a growing folder of sounds I will use eventually. If you want to talk shop about type, timing or why a certain transition feels right, I will happily derail a conversation for an hour.",
]

export default function Page() {
  const [slide, setSlide] = useState(0)
  const [pressed, setPressed] = useState<"left" | "right" | null>(null)

  const changeSlide = (direction: "left" | "right") => {
    setSlide(
      (current) =>
        (current + (direction === "left" ? -1 : 1) + testimonials.length) %
        testimonials.length
    )
  }

  const arrowButton = (direction: "left" | "right") => (
    <button
      type="button"
      aria-label={
        direction === "left" ? "Previous testimonial" : "Next testimonial"
      }
      onClick={() => changeSlide(direction)}
      onPointerDown={() => setPressed(direction)}
      onPointerUp={() => setPressed(null)}
      onPointerLeave={() => setPressed(null)}
      onPointerCancel={() => setPressed(null)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          setPressed(direction)
        }
      }}
      onKeyUp={() => setPressed(null)}
      className="relative h-14 w-14 shrink-0 sm:h-24 sm:w-24"
    >
      <Image
        src={`/testimonials/arrow-${direction}${pressed === direction ? "-clicked" : ""}.png`}
        alt=""
        fill
        sizes="96px"
        className="object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.45)]"
      />
    </button>
  )

  return (
    <main className="relative min-h-svh overflow-x-hidden">
      {/* Backdrop lives in the document, so it scrolls 1:1 with the page. */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/space-bg.webp"
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
          src="/hero-text.webp"
          alt=""
          width={1019}
          height={429}
          priority
          className="h-auto w-full max-w-3xl -rotate-2"
        />
      </section>

      {/* 2. Process */}
      <section aria-labelledby="process-heading" className="py-24 sm:py-32">
        <div
          className={cn(shellClass, "grid items-center gap-12 lg:grid-cols-2")}
        >
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
                <Link
                  href={item.href}
                  aria-label={`${item.label} — view work`}
                  className="block transition-transform duration-300 ease-out hover:rotate-0 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/70 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
                >
                  <Image
                    src={item.src}
                    alt=""
                    width={item.width}
                    height={item.height}
                    sizes="240px"
                    className="h-44 w-auto object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.45)]"
                  />
                </Link>
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

        {/* One centered poster: heading and story art share the same max width. */}
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-10 px-6 sm:px-10">
          <Image
            src="/main-char.svg"
            alt=""
            width={932}
            height={810}
            unoptimized
            className="h-auto w-full"
          />
          <div className="relative w-full">              <Image
                src="/full-text.webp"
                alt=""
                width={1164}
                height={1986}
                className="h-auto w-full"
              />
              {/* Yellow banner sits just above the "I Am" line, tipped up to the right. */}
              <Image
              src="/yellow-banner.webp"
              alt=""
              width={799}
              height={281}
              sizes="34vw"
                className="pointer-events-none absolute left-1/2 top-[-5%] w-[34%] -translate-x-1/2 rotate-2 drop-shadow-[0_10px_16px_rgba(0,0,0,0.4)]"
              />
              {/* Nametag scaled up and wedged between "I Am" and "AnD My",
                  its bottom edge just kissing the line below. */}
              <Image
              src="/red-banner.webp"
              alt=""
              width={531}
              height={354}
              sizes="24vw"
                className="pointer-events-none absolute left-1/2 top-[1%] w-[22%] -translate-x-1/2 -rotate-2 drop-shadow-[0_10px_16px_rgba(0,0,0,0.4)]"
              />
              {/* Polaroid pinned over the orange "4" and the skills list. */}
              <Image
              src="/polaroid-1.webp"
              alt=""
              width={495}
              height={603}
              sizes="28vw"
                className="pointer-events-none absolute right-[1%] top-[26%] w-[28%] -rotate-2 drop-shadow-[0_14px_22px_rgba(0,0,0,0.45)]"
              />
              {/* Duplicate polaroid tucked below "* 3D StUfF" on the left edge. */}
              <Image
              src="/polaroid-1.webp"
              alt=""
              width={495}
              height={603}
              sizes="24vw"
                className="pointer-events-none absolute left-[2%] top-[52%] w-[24%] rotate-2 drop-shadow-[0_14px_22px_rgba(0,0,0,0.45)]"
              />
              {/* Hand-drawn accent above the artwork's closing text block. */}
              <p
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-[75.5%] -translate-x-1/2 -rotate-[8deg] font-marker text-[clamp(1.5rem,4.5vw,3.75rem)] leading-none text-orange-500 whitespace-nowrap"
              >
                Canon Event
              </p>
              {/* Sits in the gap under the "i Kick Ass At" line of the artwork. */}
              <ul className="absolute inset-x-0 top-[66%] flex items-center justify-center gap-5 sm:gap-8">
                {tools.map((tool) => (
                  <li key={tool.label}>
                    <Image
                      src={tool.src}
                      alt={tool.label}
                      width={tool.width}
                      height={tool.height}
                      sizes="64px"
                      unoptimized={tool.src.endsWith(".svg")}
                      className={cn(
                        "w-auto drop-shadow-[0_6px_10px_rgba(0,0,0,0.45)]",
                        tool.className
                      )}
                    />
                  </li>
                ))}
              </ul>
          </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section
        aria-labelledby="testimonials-heading"
        className="py-24 sm:py-32"
      >
        <div className={shellClass}>
          <h2 id="testimonials-heading" className="sr-only">
            Testimonials
          </h2>
          <Image
            src="/testimonials.webp"
            alt=""
            width={1199}
            height={230}
            className="mx-auto h-auto w-full max-w-md -rotate-1"
          />

          <div className="mt-12 flex items-center justify-center gap-2 sm:gap-8">
            {arrowButton("left")}

            <div className="relative w-full min-w-0 max-w-2xl">
              <Image
                src="/monitor.webp"
                alt=""
                width={1024}
                height={1278}
                sizes="(min-width: 768px) 672px, 60vw"
                className="h-auto w-full drop-shadow-[0_28px_45px_rgba(0,0,0,0.5)]"
              />
              <div className="absolute left-[8%] top-[22.3%] h-[48.5%] w-[86.1%] overflow-hidden rounded-[2.5%] bg-black">
                <Image
                  src={testimonials[slide].src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 580px, 210px"
                  className="object-contain"
                />
              </div>
            </div>

            {arrowButton("right")}
          </div>

          <div
            aria-live="polite"
            className="mx-auto mt-8 max-w-2xl text-center"
          >
            <blockquote className="font-marker text-xl leading-snug text-zinc-100 sm:text-2xl">
              &ldquo;{testimonials[slide].quote}&rdquo;
            </blockquote>
            <Text
              variant="small"
              className="mt-4 tracking-widest text-zinc-400 uppercase"
            >
              {testimonials[slide].client}
            </Text>
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
