import type { Metadata } from "next"

import { projects } from "@/data/portfolio/films"
import ProjectShowcase from "@/components/project-showcase"

export const metadata: Metadata = {
  title: "Ritorshi Portfolio — Films",
  description: "Film work by Ritorshi.",
}

export default function Page() {
  return <ProjectShowcase title="Films" projects={projects} />
}
