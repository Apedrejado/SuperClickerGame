import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from "@/providers/theme-provider";
import { DM_Sans } from "next/font/google";

const font = DM_Sans ({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Super cliker',
  description: 'Dev by chefe Gordo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
          <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >{children}
          </ThemeProvider>
      </body>
    </html>
  )
}
