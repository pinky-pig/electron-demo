import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AppState {
  isCollapsed: boolean
  toggleSidebarCollapsed: () => void

  sidebarWidth: number
  lastSidebarWidth: number
  setSidebarWidth: (width: number) => void

  hasBorder: boolean
  toggleHasBorder: () => void

  theme: 'light' | 'dark' | 'system'
  toggleTheme: (theme: 'light' | 'dark' | 'system') => void
}

// partialize 过滤属性，存储哪些字段到localStorage
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // ------------侧边栏-------------
      isCollapsed: false,
      toggleSidebarCollapsed: () =>
        set((state) => ({
          isCollapsed: (state.isCollapsed = !state.isCollapsed),
        })),

      // ------------侧边栏宽度-------------
      sidebarWidth: 256,
      lastSidebarWidth: 256,
      setSidebarWidth: (width) =>
        set((state) => {
          /**
           * 保存上一次的宽度
           * 1. 如果上一次是 0 ，那么就用上上一次的
           */
          const currentWidth = state.sidebarWidth
          return {
            sidebarWidth: width,
            lastSidebarWidth:
              currentWidth === 0 ? state.lastSidebarWidth : currentWidth,
          }
        }),

      // ------------边框---------------
      hasBorder: true,
      toggleHasBorder: () =>
        set((state) => ({
          hasBorder: (state.hasBorder = !state.hasBorder),
        })),

      // ------------主题---------------
      theme: 'system',
      toggleTheme: (theme) => set(() => ({ theme })),
    }),
    {
      // localStorage 中的名称
      name: 'user-settings',
      // 使用 localStorage（默认）
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
