import Navigation from '../components/Navigation.tsx'
import './ProofPage.css'

function ProofPage() {
  return (
    <div className="proof-page-new">
      <Navigation />
      
      <div className="proof-container-new">
        <h1>Proof of Work</h1>
        <p className="proof-description">
          This page will display your resume artifacts and completion status.
        </p>

        <div className="proof-placeholder">
          <div className="placeholder-icon">📄</div>
          <p>Artifacts will appear here</p>
        </div>
      </div>
    </div>
  )
}

export default ProofPage
