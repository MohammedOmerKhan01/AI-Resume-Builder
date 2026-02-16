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

  const allStepsComplete = projectStore.allStepsComplete()
  const allTestsPassed = projectStore.allTestsPassed()
  const allLinksProvided = projectStore.allLinksProvided()
  const isShipped = projectStore.isShipped()

  const handleCopySubmission = async () => {
    const submission = `------------------------------------------
AI Resume Builder — Final Submission

Lovable Project: ${state.lovableLink}
GitHub Repository: ${state.githubLink}
Live Deployment: ${state.deployLink}

Core Capabilities:
- Structured resume builder
- Deterministic ATS scoring
- Template switching
- PDF export with clean formatting
- Persistence + validation checklist
------------------------------------------`

    await navigator.clipboard.writeText(submission)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getStatusBadge = () => {
    if (isShipped) {
      return <div className="status-badge shipped">Shipped</div>
    }
    return <div className="status-badge in-progress">In Progress</div>
  }

  return (
    <div className="proof-page">
      <div className="proof-container">
        <div className="proof-header">
          <div className="header-top">
            <h1>AI Resume Builder — Proof</h1>
            {getStatusBadge()}
          </div>
          <p>Complete all steps, pass all tests, and provide deployment links</p>
        </div>

        {isShipped && (
          <div className="shipped-message">
            Project 3 Shipped Successfully.
          </div>
        )}

        {/* Step Completion Overview */}
        <div className="section">
          <h2>Step Completion Overview</h2>
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
          <div className="completion-summary">
            {allStepsComplete ? (
              <span className="summary-complete">✓ All 8 steps completed</span>
            ) : (
              <span className="summary-incomplete">
                {steps.filter(s => projectStore.hasArtifact(s.num)).length}/8 steps completed
              </span>
            )}
          </div>
        </div>

        {/* Test Checklist */}
        <div className="section">
          <h2>Test Checklist (Required)</h2>
          <div className="test-checklist">
            {state.testResults.map((test) => (
              <div key={test.id} className="test-item">
                <label className="test-label">
                  <input
                    type="checkbox"
                    checked={test.passed}
                    onChange={() => projectStore.toggleTestResult(test.id)}
                  />
                  <span className={test.passed ? 'test-passed' : ''}>{test.name}</span>
                </label>
              </div>
            ))}
          </div>
          <div className="completion-summary">
            {allTestsPassed ? (
              <span className="summary-complete">✓ All 10 tests passed</span>
            ) : (
              <span className="summary-incomplete">
                {state.testResults.filter(t => t.passed).length}/10 tests passed
              </span>
            )}
          </div>
        </div>

        {/* Artifact Collection */}
        <div className="section">
          <h2>Artifact Collection (Required to mark Shipped)</h2>
          
          <div className="input-group">
            <label htmlFor="lovable-link">
              Lovable Project Link <span className="required">*</span>
            </label>
            <input
              id="lovable-link"
              type="url"
              placeholder="https://lovable.dev/projects/..."
              value={state.lovableLink}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => projectStore.setLovableLink(e.target.value)}
              className={state.lovableLink && !projectStore.isShipped() ? 'valid' : ''}
            />
            {state.lovableLink && !isValidUrl(state.lovableLink) && (
              <span className="validation-error">Please enter a valid URL</span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="github-link">
              GitHub Repository Link <span className="required">*</span>
            </label>
            <input
              id="github-link"
              type="url"
              placeholder="https://github.com/username/repo"
              value={state.githubLink}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => projectStore.setGithubLink(e.target.value)}
              className={state.githubLink && !projectStore.isShipped() ? 'valid' : ''}
            />
            {state.githubLink && !isValidUrl(state.githubLink) && (
              <span className="validation-error">Please enter a valid URL</span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="deploy-link">
              Deployed URL <span className="required">*</span>
            </label>
            <input
              id="deploy-link"
              type="url"
              placeholder="https://your-app.vercel.app"
              value={state.deployLink}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => projectStore.setDeployLink(e.target.value)}
              className={state.deployLink && !projectStore.isShipped() ? 'valid' : ''}
            />
            {state.deployLink && !isValidUrl(state.deployLink) && (
              <span className="validation-error">Please enter a valid URL</span>
            )}
          </div>

          <div className="completion-summary">
            {allLinksProvided ? (
              <span className="summary-complete">✓ All 3 links provided</span>
            ) : (
              <span className="summary-incomplete">
                {[state.lovableLink, state.githubLink, state.deployLink].filter(l => l && isValidUrl(l)).length}/3 links provided
              </span>
            )}
          </div>
        </div>

        {/* Final Submission */}
        <div className="section">
          <h2>Final Submission</h2>
          
          <button
            className={`copy-submission-button ${copied ? 'copied' : ''}`}
            onClick={handleCopySubmission}
            disabled={!isShipped}
          >
            {copied ? '✓ Copied to Clipboard!' : 'Copy Final Submission'}
          </button>

          {!isShipped && (
            <div className="requirements-list">
              <p className="requirements-title">Requirements to ship:</p>
              <ul>
                {!allStepsComplete && <li>✗ Complete all 8 steps with artifacts</li>}
                {!allTestsPassed && <li>✗ Pass all 10 checklist tests</li>}
                {!allLinksProvided && <li>✗ Provide all 3 deployment links</li>}
              </ul>
            </div>
          )}
        </div>

        <Link to="/rb/01-problem" className="back-link">
          ← Back to Steps
        </Link>
      </div>
    </div>
  )
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export default RBProofPage
