export default function SidebarContent() {
  return (
    <div className="flex flex-col h-full pl-3">
      <div className="h-8 w-full flex-shrink-0 flex-grow-0">Header</div>
      <div className="flex-1 w-full ">Content</div>
      <div className="h-8 w-full flex-shrink-0 flex-grow-0 flex flex-row">
        Footer
      </div>
    </div>
  )
}
