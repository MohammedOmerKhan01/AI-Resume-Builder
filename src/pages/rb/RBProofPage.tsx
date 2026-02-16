import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { projectStore } from '../../store/projectStore'
import './RBProofPage.css'

function RBProofPage() {
  const [state, setState] = useState(projectStore.getState())
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const unsubscribe = projectStore.subscribe(() => {
      setState(projectStore.getState())
    })
    return () => {
      unsubscribe()
    }
  }, [])

  const steps = [
    { num: 1, name: 'Problem', route: '01-problem' },
    { num: 2, name: 'Market', route: '02-market' },
    { num: 3, name: 'Architecture', route: '03-architecture' },
    { num: 4, name: 'HLD', route: '04-hld' },
    { num: 5, name: 'LLD', route: '05-lld' },
    { num: 6, name: 'Build', route: '06-build' },
    { num: 7, name: 'Test', route: '07-test' },
    { num: 8, name: 'Ship', route: '08-ship' },
  ]

  const allStepsComplete = steps.every(step => projectStore.hasArtifact(step.num))
  const allLinksProvided = state.lovableLink && state.githubLink && state.deployLink

  const handleCopySubmission = async () => {
    const submission = `AI Resume Builder - Project 3 Submission

Lovable Link: ${state.lovableLink}
GitHub Link: ${state.githubLink}
Deploy Link: ${state.deployLink}

All 8 steps completed with artifacts uploaded.`

    await navigator.clipboard.writeText(submission)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="proof-page">
      <div className="proof-container">
        <div className="proof-header">
          <h1>AI Resume Builder — Proof</h1>
          <p>Track your progress and submit your final project</p>
        </div>

        <div className="steps-grid">
          {steps.map(step => {
            const isComplete = projectStore.hasArtifact(step.num)
            return (
              <Link 
                key={step.num} 
                to={`/rb/${step.route}`}
                style={{ textDecoration: 'none' }}
              >
                <div className={`step-card ${isComplete ? 'complete' : ''}`}>
                  <div className="step-number">Step {step.num}</div>
                  <div className="step-title">{step.name}</div>
                  <div className={`step-status ${isComplete ? 'complete' : 'pending'}`}>
                    {isComplete ? '✓ Complete' : 'Pending'}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="submission-section">
          <h2>Final Submission</h2>
          
          <div className="input-group">
            <label htmlFor="lovable-link">Lovable Project Link</label>
            <input
              id="lovable-link"
              type="url"
              placeholder="https://lovable.dev/projects/..."
              value={state.lovableLink}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => projectStore.setLovableLink(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="github-link">GitHub Repository Link</label>
            <input
              id="github-link"
              type="url"
              placeholder="https://github.com/username/repo"
              value={state.githubLink}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => projectStore.setGithubLink(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="deploy-link">Deployed Application Link</label>
            <input
              id="deploy-link"
              type="url"
              placeholder="https://your-app.vercel.app"
              value={state.deployLink}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => projectStore.setDeployLink(e.target.value)}
            />
          </div>

          <button
            className={`copy-submission-button ${copied ? 'copied' : ''}`}
            onClick={handleCopySubmission}
            disabled={!allStepsComplete || !allLinksProvided}
          >
            {copied ? '✓ Copied to Clipboard!' : 'Copy Final Submission'}
          </button>

          {(!allStepsComplete || !allLinksProvided) && (
            <p style={{ marginTop: '16px', fontSize: '14px', color: '#888', textAlign: 'center' }}>
              {!allStepsComplete && 'Complete all 8 steps and upload artifacts. '}
              {!allLinksProvided && 'Fill in all project links.'}
            </p>
          )}
        </div>

        <Link to="/rb/01-problem" className="back-link">
          ← Back to Steps
        </Link>
      </div>
    </div>
  )
}

export default RBProofPage
