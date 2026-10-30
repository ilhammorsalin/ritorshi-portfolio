import { Geist, Geist_Mono, Noto_Sans, Permanent_Marker, Playfair_Display } from "next/font/google"

import "./globals.css"
import { Providers } from "@/components/providers"
import { cn } from "@/lib/utils";

const playfairDisplayHeading = Playfair_Display({subsets:['latin'],variable:'--font-heading'});

const permanentMarker = Permanent_Marker({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-marker',
})

const notoSans = Noto_Sans({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("dark", "antialiased", fontMono.variable, "font-sans", notoSans.variable, playfairDisplayHeading.variable, permanentMarker.variable)}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
