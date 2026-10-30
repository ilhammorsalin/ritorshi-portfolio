"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import * as React from "react"
import { useRef } from "react"
import { Text } from "@/components/ui/typography"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden border-t border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Text variant="h2" className="mb-8">
          {title}
        </Text>
        {children}
      </div>
    </section>
  )
}

export function ParallaxShowcase() {
  return (
    <div>
      <BackgroundParallax />
      <MultiLayerParallax />
      <TextParallax />
      <HorizontalParallax />
      <StickyScaleParallax />
    </div>
  )
}

function BackgroundParallax() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"])
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1])

  return (
    <Section title="Background parallax">
      <div ref={ref} className="relative h-[60vh] overflow-hidden rounded-lg">
        <motion.div style={{ y, scale }} className="absolute inset-0 bg-gradient-to-br from-amber-200 via-rose-200 to-indigo-300 dark:from-amber-900 dark:via-rose-900 dark:to-indigo-900" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <Text variant="h1" className="text-white">
            Background moves slower
          </Text>
        </div>
      </div>
    </Section>
  )
}

function MultiLayerParallax() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const yBack = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"])
  const yMid = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"])
  const yFront = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"])

  return (
    <Section title="Multi-layer parallax">
      <div ref={ref} className="relative h-[70vh] overflow-hidden rounded-lg bg-muted">
        <motion.div style={{ y: yBack }} className="absolute inset-0 flex items-center justify-center opacity-30">
          <span className="font-heading text-[12rem] font-bold">BACK</span>
        </motion.div>
        <motion.div style={{ y: yMid }} className="absolute inset-0 flex items-center justify-center opacity-60">
          <span className="font-heading text-[8rem] font-bold">MID</span>
        </motion.div>
        <motion.div style={{ y: yFront }} className="absolute inset-0 flex items-center justify-center">
          <span className="font-heading text-5xl font-bold">FRONT</span>
        </motion.div>
      </div>
    </Section>
  )
}

function TextParallax() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <Section title="Text parallax">
      <div ref={ref} className="relative h-[50vh] overflow-hidden rounded-lg bg-secondary">
        <motion.div style={{ y, opacity }} className="absolute inset-0 flex items-center justify-center">
          <Text variant="h1">Floating headline</Text>
        </motion.div>
      </div>
    </Section>
  )
}

function HorizontalParallax() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"])

  return (
    <Section title="Horizontal scroll parallax">
      <div ref={ref} className="relative h-[200vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex h-64 w-64 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-4xl font-bold"
              >
                {i + 1}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

function StickyScaleParallax() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180])

  return (
    <Section title="Sticky scale & rotate">
      <div ref={ref} className="flex h-[60vh] items-center justify-center">
        <motion.div style={{ scale, rotate }} className="h-40 w-40 rounded-lg bg-primary" />
      </div>
    </Section>
  )
}