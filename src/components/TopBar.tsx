import './TopBar.css'

type Props = {
  step: number
  hasArtifact: boolean
}

function TopBar({ step, hasArtifact }: Props) {
  return (
    <div className="top-bar">
      <div className="top-bar-left">AI Resume Builder</div>
      <div className="top-bar-center">Project 3 — Step {step} of 8</div>
      <div className="top-bar-right">
        <div className={`status-badge ${hasArtifact ? 'complete' : 'pending'}`}>
          {hasArtifact ? 'Complete' : 'Pending'}
        </div>
      </div>
    </div>
  )
}

export default TopBar
