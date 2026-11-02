import type { Metadata } from "next"

import { projects } from "@/data/portfolio/animation"
import ProjectShowcase from "@/components/project-showcase"

export const metadata: Metadata = {
  title: "Ritorshi Portfolio — Animation",
  description: "Animation work by Ritorshi.",
}

export default function Page() {
  return <ProjectShowcase title="Animation" projects={projects} />
}
