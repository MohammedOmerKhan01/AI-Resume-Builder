import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BuilderPage from './pages/BuilderPage'
import PreviewPage from './pages/PreviewPage'
import ProofPage from './pages/ProofPage'
import PremiumLayout from './components/PremiumLayout'
import ProblemStep from './pages/rb/ProblemStep'
import MarketStep from './pages/rb/MarketStep'
import ArchitectureStep from './pages/rb/ArchitectureStep'
import HLDStep from './pages/rb/HLDStep'
import LLDStep from './pages/rb/LLDStep'
import BuildStep from './pages/rb/BuildStep'
import TestStep from './pages/rb/TestStep'
import ShipStep from './pages/rb/ShipStep'
import RBProofPage from './pages/rb/RBProofPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AI Resume Builder Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/builder" element={<BuilderPage />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/proof" element={<ProofPage />} />
        
        {/* KodNest Build System Routes */}
        <Route path="/rb/01-problem" element={<PremiumLayout step={1}><ProblemStep /></PremiumLayout>} />
        <Route path="/rb/02-market" element={<PremiumLayout step={2}><MarketStep /></PremiumLayout>} />
        <Route path="/rb/03-architecture" element={<PremiumLayout step={3}><ArchitectureStep /></PremiumLayout>} />
        <Route path="/rb/04-hld" element={<PremiumLayout step={4}><HLDStep /></PremiumLayout>} />
        <Route path="/rb/05-lld" element={<PremiumLayout step={5}><LLDStep /></PremiumLayout>} />
        <Route path="/rb/06-build" element={<PremiumLayout step={6}><BuildStep /></PremiumLayout>} />
        <Route path="/rb/07-test" element={<PremiumLayout step={7}><TestStep /></PremiumLayout>} />
        <Route path="/rb/08-ship" element={<PremiumLayout step={8}><ShipStep /></PremiumLayout>} />
        <Route path="/rb/proof" element={<RBProofPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
