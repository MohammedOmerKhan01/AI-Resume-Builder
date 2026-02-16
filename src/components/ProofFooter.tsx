import { Link, useNavigate } from 'react-router-dom'
import './ProofFooter.css'

type Props = {
  step: number
  hasArtifact: boolean
  onNext: () => void
}

function ProofFooter({ step, hasArtifact, onNext }: Props) {
  const navigate = useNavigate()

  const handlePrev = () => {
    if (step > 1) {
      const prevStep = step - 1
      const stepNames = ['problem', 'market', 'architecture', 'hld', 'lld', 'build', 'test', 'ship']
      navigate(`/rb/0${prevStep}-${stepNames[prevStep - 1]}`)
    }
  }

  return (
    <div className="proof-footer">
      <div className="footer-left">
        <Link to="/rb/proof" className="proof-link">
          View Proof Page
        </Link>
        <span className="step-indicator">
          Step {step} of 8
        </span>
      </div>

      <div className="footer-right">
        {step > 1 && (
          <button className="footer-button prev-button" onClick={handlePrev}>
            ← Previous
          </button>
        )}
        {step < 8 && (
          <button 
            className="footer-button next-button" 
            onClick={onNext}
            disabled={!hasArtifact}
          >
            Next →
          </button>
        )}
      </div>
    </div>
  )
}

export default ProofFooter
