import { useState, useEffect } from 'react'
import Navigation from '../components/Navigation.tsx'
import { resumeStore } from '../store/resumeStore'
import ResumePreview from '../components/ResumePreview.tsx'
import ATSScore from '../components/ATSScore.tsx'
import TemplatePicker from '../components/TemplatePicker.tsx'
import SkillsSection from '../components/SkillsSection.tsx'
import ProjectsSection from '../components/ProjectsSection.tsx'
import { calculateATSScore } from '../utils/atsScoring'
import './BuilderPage.css'

function BuilderPage() {
  const [data, setData] = useState(resumeStore.getState())
  const atsScore = calculateATSScore(data)

  useEffect(() => {
    const unsubscribe = resumeStore.subscribe(() => {
      setData(resumeStore.getState())
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div className="builder-page">
      <Navigation />
      
      <div className="builder-container">
        <div className="builder-left">
          <div className="builder-header">
            <h1>Resume Builder</h1>
            <button 
              className="load-sample-btn"
              onClick={() => resumeStore.loadSampleData()}
            >
              Load Sample Data
            </button>
          </div>

          <div className="form-section">
            <h2>Personal Information</h2>
            <input
              type="text"
              placeholder="Full Name"
              value={data.personalInfo.name}
              onChange={(e) => resumeStore.updatePersonalInfo({ name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={data.personalInfo.email}
              onChange={(e) => resumeStore.updatePersonalInfo({ email: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Phone"
              value={data.personalInfo.phone}
              onChange={(e) => resumeStore.updatePersonalInfo({ phone: e.target.value })}
            />
            <input
              type="text"
              placeholder="Location"
              value={data.personalInfo.location}
              onChange={(e) => resumeStore.updatePersonalInfo({ location: e.target.value })}
            />
          </div>

          <div className="form-section">
            <h2>Summary</h2>
            <textarea
              placeholder="Brief professional summary..."
              value={data.summary}
              onChange={(e) => resumeStore.updateSummary(e.target.value)}
              rows={4}
            />
          </div>

          <div className="form-section">
            <div className="section-header">
              <h2>Education</h2>
              <button onClick={() => resumeStore.addEducation()}>+ Add</button>
            </div>
            {data.education.map((edu) => (
              <div key={edu.id} className="entry-card">
                <input
                  type="text"
                  placeholder="School"
                  value={edu.school}
                  onChange={(e) => resumeStore.updateEducation(edu.id, { school: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => resumeStore.updateEducation(edu.id, { degree: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Field of Study"
                  value={edu.field}
                  onChange={(e) => resumeStore.updateEducation(edu.id, { field: e.target.value })}
                />
                <div className="date-row">
                  <input
                    type="text"
                    placeholder="Start Year"
                    value={edu.startDate}
                    onChange={(e) => resumeStore.updateEducation(edu.id, { startDate: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="End Year"
                    value={edu.endDate}
                    onChange={(e) => resumeStore.updateEducation(edu.id, { endDate: e.target.value })}
                  />
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => resumeStore.removeEducation(edu.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="form-section">
            <div className="section-header">
              <h2>Experience</h2>
              <button onClick={() => resumeStore.addExperience()}>+ Add</button>
            </div>
            {data.experience.map((exp) => (
              <div key={exp.id} className="entry-card">
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => resumeStore.updateExperience(exp.id, { company: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Position"
                  value={exp.position}
                  onChange={(e) => resumeStore.updateExperience(exp.id, { position: e.target.value })}
                />
                <div className="date-row">
                  <input
                    type="text"
                    placeholder="Start Date"
                    value={exp.startDate}
                    onChange={(e) => resumeStore.updateExperience(exp.id, { startDate: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="End Date"
                    value={exp.endDate}
                    onChange={(e) => resumeStore.updateExperience(exp.id, { endDate: e.target.value })}
                  />
                </div>
                <textarea
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => resumeStore.updateExperience(exp.id, { description: e.target.value })}
                  rows={3}
                />
                <button 
                  className="remove-btn"
                  onClick={() => resumeStore.removeExperience(exp.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <ProjectsSection projects={data.projects} />

          <SkillsSection skills={data.skills} />

          <div className="form-section">
            <h2>Links</h2>
            <input
              type="text"
              placeholder="GitHub URL"
              value={data.links.github}
              onChange={(e) => resumeStore.updateLinks({ github: e.target.value })}
            />
            <input
              type="text"
              placeholder="LinkedIn URL"
              value={data.links.linkedin}
              onChange={(e) => resumeStore.updateLinks({ linkedin: e.target.value })}
            />
          </div>
        </div>

        <div className="builder-right">
          <div className="preview-sticky">
            <ATSScore score={atsScore} />
            <h3>Live Preview</h3>
            <TemplatePicker 
              selectedTemplate={data.template}
              selectedColor={data.colorTheme}
              onTemplateSelect={(template) => resumeStore.setTemplate(template)}
              onColorSelect={(color) => resumeStore.setColorTheme(color)}
            />
            <ResumePreview data={data} showGuidance={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuilderPage
