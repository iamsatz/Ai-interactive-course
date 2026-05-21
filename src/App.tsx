import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProgressProvider } from '@/context/ProgressContext'
import { Nav } from '@/components/layout/Nav'
import { Landing } from '@/pages/Landing'
import { SectionPage } from '@/pages/SectionPage'
import { ResourcesPage } from '@/pages/ResourcesPage'

function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/section/:sectionId" element={<SectionPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
        </Routes>
      </BrowserRouter>
    </ProgressProvider>
  )
}

export default App
