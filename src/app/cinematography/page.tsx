import type { Metadata } from "next"
import Link from "next/link"

import { Text } from "@/components/ui/typography"

export const metadata: Metadata = {
  title: "Ritorshi Portfolio — Cinematography",
  description: "Cinematography and film work from Ritorshi's Studio.",
}

export default function Page() {
  return (
    <main className="min-h-svh p-8">
      <Text variant="h1">Cinematography</Text>
      <Text variant="lead" className="mt-2">
        Work in progress — check back soon.
      </Text>
      <Link
        href="/"
        className="mt-4 inline-block text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
      >
        Back home
      </Link>
    </main>
  )
}
