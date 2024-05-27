import SiteHeader from '@/components/site-header';
import { ThemeProvider } from '@/components/theme-provider';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: RootLayoutProps) {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
      </div>
    </ThemeProvider>
  );
}
