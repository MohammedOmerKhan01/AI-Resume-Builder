import { useState } from 'react'
import { projectStore } from '../store/projectStore'
import './BuildPanel.css'

type Props = {
  step: number
}

function BuildPanel({ step }: Props) {
  const [copied, setCopied] = useState(false)
  const [uploaded, setUploaded] = useState(projectStore.hasArtifact(step))

  const promptText = `Build an AI Resume Builder application with the following features:
- Modern, professional UI
- Resume template selection
- AI-powered content suggestions
- Export to PDF
- Responsive design`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(promptText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleLovable = () => {
    window.open('https://lovable.dev', '_blank')
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      projectStore.uploadArtifact(step, file)
      setUploaded(true)
    }
  }

  return (
    <div className="build-panel">
      <div className="build-panel-section">
        <h3>Copy This Into Lovable</h3>
        <textarea 
          className="lovable-textarea" 
          value={promptText}
          readOnly
        />
        <button 
          className={`copy-button ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
        >
          {copied ? '✓ Copied!' : 'Copy Prompt'}
        </button>
      </div>

      <div className="build-panel-section">
        <button className="lovable-button" onClick={handleLovable}>
          Build in Lovable →
        </button>
      </div>

      <div className="build-panel-section">
        <h3>Result</h3>
        <div className="result-buttons">
          <button className="result-button worked">It Worked</button>
          <button className="result-button error">Error</button>
        </div>
        <button className="result-button screenshot">Add Screenshot</button>
      </div>

      <div className="build-panel-section">
        <h3>Upload Artifact</h3>
        <div className="upload-section">
          <input 
            type="file" 
            id={`artifact-${step}`}
            onChange={handleFileUpload}
            accept="image/*,.pdf,.zip"
          />
          <label htmlFor={`artifact-${step}`} className="upload-label">
            Choose File
          </label>
          {uploaded && (
            <div className="upload-status">✓ Artifact uploaded</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BuildPanel
