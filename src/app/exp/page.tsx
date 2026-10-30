import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Text } from "@/components/ui/typography"
import { MotionShowcase } from "@/components/motion-showcase"
import { ParallaxShowcase } from "@/components/parallax-showcase"

export const metadata: Metadata = {
  title: "Ritorshi Portfolio — Experiments",
  description: "Experimental playground for the Ritorshi portfolio.",
}

export default function Page() {
  return (
    <main className="min-h-svh p-8">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <Text variant="h1">Ritorshi Portfolio</Text>
        <Link
          href="/"
          className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          Back home
        </Link>
      </div>
      <Text variant="lead" className="mt-2">
        Boilerplate with Next.js, Tailwind, and Base UI.
      </Text>
      <div className="mt-8 flex gap-4">
        <Button>Primary</Button>
        <Button variant="outline">Outline</Button>
      </div>
      <Card className="mt-8 max-w-md">
        <CardHeader>
          <CardTitle>Card title</CardTitle>
          <CardDescription>A reusable card primitive.</CardDescription>
        </CardHeader>
        <CardContent>
          <Text variant="muted">Styled with design tokens.</Text>
        </CardContent>
      </Card>

      <section className="mt-12">
        <Text variant="h2">Motion experiments</Text>
        <div className="mt-6">
          <MotionShowcase />
        </div>
      </section>

      <section className="mt-12">
        <Text variant="h2">Parallax experiments</Text>
        <div className="mt-6">
          <ParallaxShowcase />
        </div>
      </section>
    </main>
  )
}
