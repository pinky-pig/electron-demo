import { CalendarDays, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
export default function SidebarContent() {
  const main_menu = [
    {
      label: '全部画布',
      icon: Search,
      href: '/',
    },
    {
      label: '日历',
      icon: CalendarDays,
      href: '/about',
    },
  ]
  return (
    <div className="flex flex-col h-full pl-3">
      <div className="h-8 w-full flex-shrink-0 flex-grow-0">{/* Header */}</div>
      <div className="flex-1 w-full flex flex-col">
        <div className="px-1 py-4">
          <div className="relative w-full">
            <Input
              className="h-[36px] pl-10 bg-transparent border border-app-black-10 focus-visible:ring-offset-0 focus-visible:ring-0"
              type="text"
              placeholder="Search"
            ></Input>
            <Search className="absolute text-app-text-1 top-1/2 -translate-y-1/2 left-3 h-[1.2rem] w-[1.2rem] "></Search>
          </div>

          <div className="w-full flex flex-col gap-1 mt-5 mb-3 text-sm font-light text-app-text">
            {main_menu.map((item, index) => {
              const Icon = item.icon // 获取图标组件
              return (
                <div
                  key={index}
                  className="w-full px-3 hover:bg-app-third rounded-md"
                >
                  <a
                    href={item.href}
                    className="h-[30px] w-full flex flex-row gap-3 items-center justify-start"
                  >
                    <Icon className="w-4 h-4 text-app-text-1"></Icon>
                    {item.label}
                  </a>
                </div>
              )
            })}
          </div>
          <Separator
            orientation="horizontal"
            className="bg-app-black-10"
          ></Separator>
        </div>
      </div>
      <div className="h-8 w-full flex-shrink-0 flex-grow-0 flex flex-row">
        {/* Footer */}
      </div>
    </div>
  )
}
