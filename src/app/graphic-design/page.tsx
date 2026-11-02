import type { Metadata } from "next"

import { projects } from "@/data/portfolio/graphic-design"
import ProjectShowcase from "@/components/project-showcase"

export const metadata: Metadata = {
  title: "Ritorshi Portfolio — Graphic Design",
  description: "Graphic design work by Ritorshi.",
}

export default function Page() {
  return (
    <ProjectShowcase title="Graphic Design" projects={projects} chips />
  )
}
