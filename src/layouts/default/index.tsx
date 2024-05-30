import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { ThemeProvider } from '@/components/theme-provider'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
import { useAppStore } from '@/store'
import { ModeToggleLite } from '@/components/theme-provider/mode-toggle'
import SidebarContent from './SidebarContent'
interface RootLayoutProps {
  children: React.ReactNode
}

export default function DefaultLayout({ children }: RootLayoutProps) {
  const {
    sidebarWidth,
    lastSidebarWidth,
    setSidebarWidth,
    isCollapsed,
    toggleSidebarCollapsed,
    hasBorder,
  } = useAppStore()

  const resizeHandleRef = React.useRef(null)
  const isMounted = React.useRef(false)
  const isToggleCollapsing = React.useRef(false)
  const maxMinSidebarWidth = [256, 480]

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // 如果是拖拽缩放的，那么就设置一下宽度。如果是点击收缩宽度为 0 ，那就不需要设置了。这里的 8 是滚动条的宽度。
        if (
          !isToggleCollapsing.current &&
          entry.contentRect.width + 8 !== sidebarWidth &&
          entry.contentRect.width !== 0
        ) {
          setSidebarWidth(entry.contentRect.width + 8)
        }
      }
    })
    if (resizeHandleRef.current) {
      resizeObserver.observe(resizeHandleRef.current)
    }
    return () => {
      if (resizeHandleRef.current) {
        resizeObserver.unobserve(resizeHandleRef.current)
      }

      isMounted.current = false
    }
  }, [])

  React.useEffect(() => {
    // 防止下一次直接进入没有设置最大最小值
    if (!isCollapsed && resizeHandleRef.current) {
      ;(resizeHandleRef.current as HTMLElement).style.minWidth =
        `${maxMinSidebarWidth[0]}px`
    }

    if (isMounted.current) {
      if (isCollapsed) {
        if (!resizeHandleRef.current) {
          return
        }
        isToggleCollapsing.current = true
        const animation = (resizeHandleRef.current as HTMLElement).animate(
          {
            width: [`${sidebarWidth}px`, '0px'],
            minWidth: [`${maxMinSidebarWidth[0]}px`, '0px'],
          },
          { duration: 300, fill: 'forwards' },
        )

        animation.onfinish = () => {
          setSidebarWidth(0)
          animation.cancel()
          isToggleCollapsing.current = false
          if (resizeHandleRef.current) {
            ;(resizeHandleRef.current as HTMLElement).style.minWidth = `0px`
          }
        }
      } else {
        // 展开侧边栏
        if (!resizeHandleRef.current) {
          return
        }

        isToggleCollapsing.current = true
        const animation = (resizeHandleRef.current as HTMLElement).animate(
          {
            width: ['0px', `${lastSidebarWidth}px`],
            minWidth: ['0px', `${maxMinSidebarWidth[0]}px`],
          },
          { duration: 300, fill: 'forwards' },
        )
        animation.onfinish = () => {
          // 设置为 0 前一次的宽度
          lastSidebarWidth && setSidebarWidth(lastSidebarWidth)
          // 取消动画 forwards 带来的影响，用于设置样式生效
          animation.cancel()
          // 当前不是点击 Collapse 触发
          isToggleCollapsing.current = false
          // 设置最小宽度
          if (resizeHandleRef.current) {
            ;(resizeHandleRef.current as HTMLElement).style.minWidth =
              `${maxMinSidebarWidth[0]}px`
          }
        }
      }
    }
    isMounted.current = true
  }, [isCollapsed])

  return (
    <TooltipProvider delayDuration={0}>
      <ThemeProvider defaultTheme="dark">
        <div className="relative flex flex-row !h-screen bg-app-primary text-app-text">
          <div className={cn('h-full relative')}>
            {/* 右侧用于拖拽分栏的 DOM */}
            <div className="peer h-[calc(100vh_-_2rem)] will-change-transform mt-4 rounded-md overflow-hidden relative z-1">
              <div
                ref={resizeHandleRef}
                style={{
                  width: `${sidebarWidth}px`,
                  maxWidth: `${maxMinSidebarWidth[1]}px`,
                }}
                className={cn(
                  'overflow-scroll resize-x w-full h-[16px] opacity-0 scale-y-[999] will-change-transform',
                )}
              ></div>
            </div>

            {/* 左侧内容侧边栏的内容 */}
            <div className="h-full w-[calc(100%_-_4px)] overflow-hidden flex flex-col absolute top-0 left-0 z-9 pb-2">
              {/* 1.头部按钮 */}
              <div
                className={cn(
                  'flex h-[52px] items-center justify-end p-4 pl-[90px] flex-shrink-0 flex-grow-0 overflow-hidden',
                )}
              >
                <Tooltip delayDuration={700}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={toggleSidebarCollapsed}
                      className={cn(
                        'rounded-md flex justify-center items-center w-8 h-8 bg-transparent hover:bg-app-third transition-all duration-300 ease-in-out',
                        isCollapsed ? 'opacity-0' : 'opacity-100',
                      )}
                    >
                      <Icons.Collapse className="w-6 h-6 text-app-text-1"></Icons.Collapse>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>折叠侧边栏</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip delayDuration={700}>
                  <TooltipTrigger>
                    <ModeToggleLite
                      className={cn(
                        'relative rounded-md flex justify-center items-center w-8 h-8 bg-transparent hover:bg-app-third transition-all duration-300 ease-in-out',
                        isCollapsed ? 'opacity-0' : 'opacity-100',
                      )}
                    >
                      <Sun
                        className={cn(
                          'h-[1.2rem] cursor-pointer w-[1.2rem] text-app-text-1 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0',
                        )}
                      />
                      <Moon
                        className={cn(
                          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer h-[1.2rem] w-[1.2rem] text-app-text-1 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100',
                        )}
                      />
                    </ModeToggleLite>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>切换暗黑主题</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              {/* 2.侧边栏内容 */}
              <div className="flex-1 w-full overflow-y-auto overflow-x-hidden">
                <SidebarContent></SidebarContent>
              </div>
            </div>
          </div>

          <div
            className={cn(
              'h-full relative bg-transparent box-border flex-1',
              hasBorder && 'p-2',
            )}
          >
            <div className="w-full h-full rounded-[8px] bg-app-secondary overflow-auto">
              <div
                className={cn(
                  'opacity-0 flex h-[52px] items-center justify-end p-4 pointer-events-none absolute top-0 left-16 transition-all duration-300 ease-in-out',
                  isCollapsed && 'opacity-100',
                )}
              >
                <button
                  onClick={toggleSidebarCollapsed}
                  className="pointer-events-auto rounded-md flex justify-center items-center w-8 h-8 bg-transparent hover:bg-app-third"
                >
                  <Icons.Collapse className="w-6 h-6 text-app-text-1"></Icons.Collapse>
                </button>
              </div>

              {children}
            </div>
          </div>
        </div>
      </ThemeProvider>
    </TooltipProvider>
  )
}
