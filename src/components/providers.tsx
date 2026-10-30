"use client"

import * as React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { DirectionProvider } from "@base-ui/react/direction-provider"
import { CSPProvider } from "@base-ui/react/csp-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CSPProvider>
      <DirectionProvider direction="ltr">
        <ThemeProvider>{children}</ThemeProvider>
      </DirectionProvider>
    </CSPProvider>
  )
}