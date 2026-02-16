import { ReactNode, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { projectStore } from '../store/projectStore'
import TopBar from './TopBar'
import BuildPanel from './BuildPanel'
import ProofFooter from './ProofFooter'
import './PremiumLayout.css'

type Props = {
  step: number
  children: ReactNode
}

function PremiumLayout({ step, children }: Props) {
  const navigate = useNavigate()
  const [hasArtifact, setHasArtifact] = useState(false)
  const [canAccess, setCanAccess] = useState(true)

  useEffect(() => {
    const updateState = () => {
      setHasArtifact(projectStore.hasArtifact(step))
      setCanAccess(projectStore.canAccessStep(step))
    }

    updateState()
    const unsubscribe = projectStore.subscribe(updateState)
    return unsubscribe
  }, [step])

  useEffect(() => {
    if (!canAccess) {
      navigate('/rb/01-problem')
    }
  }, [canAccess, navigate])

  const handleNext = () => {
    if (hasArtifact && step < 8) {
      navigate(`/rb/0${step + 1}-${getStepName(step + 1)}`)
    }
  }

  const getStepName = (stepNum: number): string => {
    const names = ['problem', 'market', 'architecture', 'hld', 'lld', 'build', 'test', 'ship']
    return names[stepNum - 1] || ''
  }

  return (
    <div className="premium-layout">
      <TopBar step={step} hasArtifact={hasArtifact} />
      
      <div className="layout-content">
        <div className="main-workspace">
          <div className="context-header">
            <h2>Step {step} of 8</h2>
            <p>Complete this step and upload your artifact to continue</p>
          </div>
          
          <div className="workspace-content">
            {children}
          </div>
        </div>

        <BuildPanel step={step} />
      </div>

      <ProofFooter 
        step={step} 
        hasArtifact={hasArtifact} 
        onNext={handleNext}
      />
    </div>
  )
}

export default PremiumLayout
