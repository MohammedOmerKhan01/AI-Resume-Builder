import { useState } from 'react'
import { resumeStore, ResumeData } from '../store/resumeStore'
import './ProjectsSection.css'

type Props = {
  projects: ResumeData['projects']
}

function ProjectsSection({ projects }: Props) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [techInputs, setTechInputs] = useState<Record<string, string>>({})

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expanded)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpanded(newExpanded)
  }

  const handleTechKeyDown = (projectId: string, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && techInputs[projectId]?.trim()) {
      e.preventDefault()
      const project = projects.find(p => p.id === projectId)
      if (project) {
        resumeStore.updateProject(projectId, {
          techStack: [...project.techStack, techInputs[projectId].trim()]
        })
        setTechInputs({ ...techInputs, [projectId]: '' })
      }
    }
  }

  const removeTech = (projectId: string, tech: string) => {
    const project = projects.find(p => p.id === projectId)
    if (project) {
      resumeStore.updateProject(projectId, {
        techStack: project.techStack.filter(t => t !== tech)
      })
    }
  }

  return (
    <div className="form-section">
      <div className="section-header">
        <h2>Projects</h2>
        <button onClick={() => {
          resumeStore.addProject()
          // Auto-expand new project
          setTimeout(() => {
            const newProject = projects[projects.length]
            if (newProject) {
              setExpanded(new Set([...expanded, newProject.id]))
            }
          }, 0)
        }}>+ Add Project</button>
      </div>

      {projects.map((project) => {
        const isExpanded = expanded.has(project.id)
        const charCount = project.description.length

        return (
          <div key={project.id} className="project-card">
            <div 
              className="project-header"
              onClick={() => toggleExpand(project.id)}
            >
              <span className="project-title">
                {project.title || 'Untitled Project'}
              </span>
              <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
            </div>

            {isExpanded && (
              <div className="project-content">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={project.title}
                  onChange={(e) => resumeStore.updateProject(project.id, { title: e.target.value })}
                />

                <div className="textarea-wrapper">
                  <textarea
                    placeholder="Project description..."
                    value={project.description}
                    onChange={(e) => {
                      if (e.target.value.length <= 200) {
                        resumeStore.updateProject(project.id, { description: e.target.value })
                      }
                    }}
                    rows={3}
                    maxLength={200}
                  />
                  <div className="char-counter">{charCount}/200</div>
                </div>

                <div className="tech-stack-section">
                  <label>Tech Stack</label>
                  <div className="skill-chips">
                    {project.techStack.map((tech, idx) => (
                      <div key={idx} className="skill-chip">
                        {tech}
                        <button onClick={() => removeTech(project.id, tech)}>×</button>
                      </div>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Type a technology and press Enter"
                    value={techInputs[project.id] || ''}
                    onChange={(e) => setTechInputs({ ...techInputs, [project.id]: e.target.value })}
                    onKeyDown={(e) => handleTechKeyDown(project.id, e)}
                  />
                </div>

                <input
                  type="text"
                  placeholder="Live URL (optional)"
                  value={project.liveUrl}
                  onChange={(e) => resumeStore.updateProject(project.id, { liveUrl: e.target.value })}
                />

                <input
                  type="text"
                  placeholder="GitHub URL (optional)"
                  value={project.githubUrl}
                  onChange={(e) => resumeStore.updateProject(project.id, { githubUrl: e.target.value })}
                />

                <button 
                  className="remove-btn"
                  onClick={() => resumeStore.removeProject(project.id)}
                >
                  Delete Project
                </button>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ProjectsSection
