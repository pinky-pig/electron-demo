// routes
import Router from '@/router'
import { DraggableTopBar } from '@/components/app/DraggableTopBar'
function App() {
  return (
    <>
      <DraggableTopBar />
      <Router />
    </>
  )
}

export default App
