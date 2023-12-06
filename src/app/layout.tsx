import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { CssBaseline, Container, ThemeProvider } from "@mui/material"
import { AppBar } from "@/components"
import theme from "@/theme"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Wypożyczalnia filmów",
  description:
    "Odkryj niekończącą się rozrywkę na naszej platformie wypożyczalni filmów! Zapewniamy szeroki wybór najnowszych hitów kinowych i klasycznych produkcji",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastContainer />
          <AppBar />
          <Container maxWidth="xl" sx={{ paddingY: 5 }}>
            {children}
          </Container>
        </ThemeProvider>
      </body>
    </html>
  )
}
