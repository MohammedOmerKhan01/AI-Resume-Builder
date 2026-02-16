import { useState } from 'react'
import { resumeStore, ResumeData } from '../store/resumeStore'
import './SkillsSection.css'

type Props = {
  skills: ResumeData['skills']
}

function SkillsSection({ skills }: Props) {
  const [inputs, setInputs] = useState({ technical: '', soft: '', tools: '' })
  const [isLoading, setIsLoading] = useState(false)

  const handleKeyDown = (category: keyof ResumeData['skills'], e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputs[category].trim()) {
      e.preventDefault()
      resumeStore.addSkill(category, inputs[category].trim())
      setInputs({ ...inputs, [category]: '' })
    }
  }

  const handleSuggest = () => {
    setIsLoading(true)
    setTimeout(() => {
      resumeStore.suggestSkills()
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="form-section">
      <div className="section-header">
        <h2>Skills</h2>
        <button 
          className="suggest-btn"
          onClick={handleSuggest}
          disabled={isLoading}
        >
          {isLoading ? '⏳ Loading...' : '✨ Suggest Skills'}
        </button>
      </div>

      <div className="skill-category">
        <label>Technical Skills ({skills.technical.length})</label>
        <div className="skill-chips">
          {skills.technical.map((skill, idx) => (
            <div key={idx} className="skill-chip">
              {skill}
              <button onClick={() => resumeStore.removeSkill('technical', skill)}>×</button>
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Type a skill and press Enter"
          value={inputs.technical}
          onChange={(e) => setInputs({ ...inputs, technical: e.target.value })}
          onKeyDown={(e) => handleKeyDown('technical', e)}
        />
      </div>

      <div className="skill-category">
        <label>Soft Skills ({skills.soft.length})</label>
        <div className="skill-chips">
          {skills.soft.map((skill, idx) => (
            <div key={idx} className="skill-chip">
              {skill}
              <button onClick={() => resumeStore.removeSkill('soft', skill)}>×</button>
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Type a skill and press Enter"
          value={inputs.soft}
          onChange={(e) => setInputs({ ...inputs, soft: e.target.value })}
          onKeyDown={(e) => handleKeyDown('soft', e)}
        />
      </div>

      <div className="skill-category">
        <label>Tools & Technologies ({skills.tools.length})</label>
        <div className="skill-chips">
          {skills.tools.map((skill, idx) => (
            <div key={idx} className="skill-chip">
              {skill}
              <button onClick={() => resumeStore.removeSkill('tools', skill)}>×</button>
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Type a tool and press Enter"
          value={inputs.tools}
          onChange={(e) => setInputs({ ...inputs, tools: e.target.value })}
          onKeyDown={(e) => handleKeyDown('tools', e)}
        />
      </div>
    </div>
  )
}

export default SkillsSection
