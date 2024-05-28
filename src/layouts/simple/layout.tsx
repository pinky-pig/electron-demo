import { ThemeProvider } from '@/components/theme-provider'

interface RootLayoutProps {
  children: React.ReactNode
}

export default function SimpleLayout({ children }: RootLayoutProps) {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="relative flex min-h-screen flex-col">
        <div className="flex-1">{children}</div>
      </div>
    </ThemeProvider>
  )
}
