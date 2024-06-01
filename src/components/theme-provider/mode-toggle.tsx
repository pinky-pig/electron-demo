import { Moon, Sun } from 'lucide-react'
import { flushSync } from 'react-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Button } from '../ui/button'
import { useTheme } from './theme-provider'

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface ModeToggleLiteProps {
  children: React.ReactNode
  className?: string
}
export function ModeToggleLite({
  className,
  children,
  ...props
}: ModeToggleLiteProps) {
  const { theme, setTheme } = useTheme()

  function toggleDark(event: React.MouseEvent) {
    // @ts-ignore
    // prettier-ignore
    const isAppearanceTransition = document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isAppearanceTransition) {
      setTheme(theme === 'dark' ? 'light' : 'dark')
      return
    }

    const x = event.clientX
    const y = event.clientY
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
      })
    })
    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        {
          clipPath: theme === 'light' ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 400,
          easing: 'ease-out',
          pseudoElement:
            theme === 'light'
              ? '::view-transition-old(root)'
              : '::view-transition-new(root)',
        },
      )
    })
  }

  return (
    <div onClick={toggleDark} className={className} {...props}>
      {children}
    </div>
  )
}

/**
 * 第二种主题切换动画，直接在 transition.ready.then(() => toggleModeSecond()) 使用
 */
export function toggleModeSecond() {
  /**
   * 需要先设置如下 css
   *  :root {
   *    background: hsl(210 70% 34%);
   *  }
   *  ::view-transition-new(root) {
   *    opacity: 0;
   *  }
   */
  const oldKeyframes = [
    { offset: 0, transform: `scale(1) rotateY(0deg)`, opacity: 1 },
    { offset: 0.25, transform: `scale(0.5) rotateY(0deg)`, opacity: 1 },
    { offset: 1, transform: `scale(0.5) rotateY(90deg)`, opacity: 0 },
  ]

  const animation1 = document.documentElement.animate(oldKeyframes, {
    duration: 500,
    easing: 'ease-in',
    pseudoElement: '::view-transition-old(root)',
  })

  animation1.onfinish = () => {
    const newKeyframes = [
      { offset: 0, transform: `scale(0.5) rotateY(90deg)`, opacity: 0 },
      { offset: 0.75, transform: `scale(0.5) rotateY(0deg)`, opacity: 1 },
      { offset: 1, transform: `scale(1) rotateY(0deg)`, opacity: 1 },
    ]
    document.documentElement.animate(newKeyframes, {
      duration: 500,
      easing: 'linear',
      pseudoElement: '::view-transition-new(root)',
    })
  }
}
