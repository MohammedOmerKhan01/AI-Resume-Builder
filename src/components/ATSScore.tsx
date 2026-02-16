import { ATSScore as ATSScoreType } from '../utils/atsScoring'
import './ATSScore.css'

type Props = {
  score: ATSScoreType
}

function ATSScore({ score }: Props) {
  // Calculate circle progress
  const radius = 60
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score.score / 100) * circumference

  return (
    <div className="ats-score">
      <h3>ATS Readiness Score</h3>
      
      <div className="score-circle-container">
        <svg className="score-circle" width="160" height="160">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="#e5e5e5"
            strokeWidth="12"
          />
          {/* Progress circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={`score-progress score-${score.level}`}
            transform="rotate(-90 80 80)"
          />
        </svg>
        <div className="score-content">
          <div className={`score-value score-${score.level}`}>{score.score}</div>
          <div className={`score-label score-${score.level}`}>{score.label}</div>
        </div>
      </div>

      {score.suggestions.length > 0 && (
        <div className="suggestions">
          <h4>Improve Your Score</h4>
          <ul>
            {score.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ATSScore