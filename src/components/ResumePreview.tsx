import { ResumeData, startsWithActionVerb, containsNumbers, COLOR_THEMES } from '../store/resumeStore'
import './ResumePreview.css'

type Props = {
  data: ResumeData
  showGuidance?: boolean
}

function ResumePreview({ data, showGuidance = false }: Props) {
  const accentColor = COLOR_THEMES[data.colorTheme]
  const hasContent = data.personalInfo.name || data.summary || 
    data.education.length > 0 || data.experience.length > 0 || 
    data.projects.length > 0 || 
    (data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.tools.length > 0) ||
    data.links.github || data.links.linkedin

  if (!hasContent) {
    return (
      <div className={`resume-preview template-${data.template}`}>
        <div className="resume-empty">
          <p>Your resume preview will appear here as you fill in the form.</p>
        </div>
      </div>
    )
  }

  const renderSkills = () => (
    (data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.tools.length > 0) && (
      <div className="resume-section">
        <h2>Skills</h2>
        {data.skills.technical.length > 0 && (
          <div className="skill-group">
            <strong>Technical:</strong>
            <div className="skill-pills">
              {data.skills.technical.map((skill, idx) => (
                <span key={idx} className="skill-pill">{skill}</span>
              ))}
            </div>
          </div>
        )}
        {data.skills.soft.length > 0 && (
          <div className="skill-group">
            <strong>Soft Skills:</strong>
            <div className="skill-pills">
              {data.skills.soft.map((skill, idx) => (
                <span key={idx} className="skill-pill">{skill}</span>
              ))}
            </div>
          </div>
        )}
        {data.skills.tools.length > 0 && (
          <div className="skill-group">
            <strong>Tools & Technologies:</strong>
            <div className="skill-pills">
              {data.skills.tools.map((skill, idx) => (
                <span key={idx} className="skill-pill">{skill}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  )

  const renderLinks = () => (
    (data.links.github || data.links.linkedin) && (
      <div className="resume-section">
        <h2>Links</h2>
        {data.links.github && <div className="resume-link">{data.links.github}</div>}
        {data.links.linkedin && <div className="resume-link">{data.links.linkedin}</div>}
      </div>
    )
  )

  // Modern template uses two-column layout
  if (data.template === 'modern') {
    return (
      <div 
        className={`resume-preview template-${data.template}`}
        style={{ '--accent-color': accentColor } as React.CSSProperties}
      >
        <div className="resume-sidebar">
          <div className="resume-header">
            <h1>{data.personalInfo.name || 'Your Name'}</h1>
            <div className="resume-contact">
              {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
              {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
              {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
            </div>
          </div>

          {renderSkills()}
          {renderLinks()}

          {data.education.length > 0 && (
            <div className="resume-section">
              <h2>Education</h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="resume-entry">
                  <div className="entry-header">
                    <strong>{edu.school || 'School'}</strong>
                    <span className="entry-date">
                      {edu.startDate} {edu.startDate && edu.endDate && '- '}{edu.endDate}
                    </span>
                  </div>
                  <div className="entry-subheader">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="resume-main">
          {data.summary && (
            <div className="resume-section">
              <h2>Summary</h2>
              <p className="resume-summary">{data.summary}</p>
            </div>
          )}

          {data.experience.length > 0 && (
            <div className="resume-section">
              <h2>Experience</h2>
              {data.experience.map((exp) => (
                <div key={exp.id} className="resume-entry">
                  <div className="entry-header">
                    <strong>{exp.position || 'Position'}</strong>
                    <span className="entry-date">
                      {exp.startDate} {exp.startDate && exp.endDate && '- '}{exp.endDate}
                    </span>
                  </div>
                  <div className="entry-subheader">{exp.company}</div>
                  {exp.description && (
                    <>
                      <p className="entry-description">{exp.description}</p>
                      {showGuidance && (
                        <>
                          {!startsWithActionVerb(exp.description) && (
                            <div className="guidance-hint">💡 Start with a strong action verb</div>
                          )}
                          {!containsNumbers(exp.description) && (
                            <div className="guidance-hint">💡 Add measurable impact (numbers)</div>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          {data.projects.length > 0 && (
            <div className="resume-section">
              <h2>Projects</h2>
              {data.projects.map((proj) => (
                <div key={proj.id} className="resume-entry project-card-preview">
                  <div className="entry-header">
                    <strong>{proj.title || 'Project Name'}</strong>
                    <div className="project-links">
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                          🔗
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                          💻
                        </a>
                      )}
                    </div>
                  </div>
                  {proj.description && (
                    <>
                      <p className="entry-description">{proj.description}</p>
                      {showGuidance && (
                        <>
                          {!startsWithActionVerb(proj.description) && (
                            <div className="guidance-hint">💡 Start with a strong action verb</div>
                          )}
                          {!containsNumbers(proj.description) && (
                            <div className="guidance-hint">💡 Add measurable impact (numbers)</div>
                          )}
                        </>
                      )}
                    </>
                  )}
                  {proj.techStack.length > 0 && (
                    <div className="tech-stack-pills">
                      {proj.techStack.map((tech, idx) => (
                        <span key={idx} className="tech-pill">{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Classic and Minimal templates use single-column layout
  return (
    <div 
      className={`resume-preview template-${data.template}`}
      style={{ '--accent-color': accentColor } as React.CSSProperties}
    >
      <div className="resume-header">
        <h1>{data.personalInfo.name || 'Your Name'}</h1>
        <div className="resume-contact">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </div>

      {data.summary && (
        <div className="resume-section">
          <h2>Summary</h2>
          <p className="resume-summary">{data.summary}</p>
        </div>
      )}

      {(data.links.github || data.links.linkedin) && (
        <div className="resume-section">
          <h2>Links</h2>
          {data.links.github && <div className="resume-link">{data.links.github}</div>}
          {data.links.linkedin && <div className="resume-link">{data.links.linkedin}</div>}
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="resume-section">
          <h2>Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="resume-entry">
              <div className="entry-header">
                <strong>{exp.position || 'Position'}</strong>
                <span className="entry-date">
                  {exp.startDate} {exp.startDate && exp.endDate && '- '}{exp.endDate}
                </span>
              </div>
              <div className="entry-subheader">{exp.company}</div>
              {exp.description && (
                <>
                  <p className="entry-description">{exp.description}</p>
                  {showGuidance && (
                    <>
                      {!startsWithActionVerb(exp.description) && (
                        <div className="guidance-hint">💡 Start with a strong action verb</div>
                      )}
                      {!containsNumbers(exp.description) && (
                        <div className="guidance-hint">💡 Add measurable impact (numbers)</div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {data.projects.length > 0 && (
        <div className="resume-section">
          <h2>Projects</h2>
          {data.projects.map((proj) => (
            <div key={proj.id} className="resume-entry project-card-preview">
              <div className="entry-header">
                <strong>{proj.title || 'Project Name'}</strong>
                <div className="project-links">
                  {proj.liveUrl && (
                    <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                      🔗
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                      💻
                    </a>
                  )}
                </div>
              </div>
              {proj.description && (
                <>
                  <p className="entry-description">{proj.description}</p>
                  {showGuidance && (
                    <>
                      {!startsWithActionVerb(proj.description) && (
                        <div className="guidance-hint">💡 Start with a strong action verb</div>
                      )}
                      {!containsNumbers(proj.description) && (
                        <div className="guidance-hint">💡 Add measurable impact (numbers)</div>
                      )}
                    </>
                  )}
                </>
              )}
              {proj.techStack.length > 0 && (
                <div className="tech-stack-pills">
                  {proj.techStack.map((tech, idx) => (
                    <span key={idx} className="tech-pill">{tech}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div className="resume-section">
          <h2>Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="resume-entry">
              <div className="entry-header">
                <strong>{edu.school || 'School'}</strong>
                <span className="entry-date">
                  {edu.startDate} {edu.startDate && edu.endDate && '- '}{edu.endDate}
                </span>
              </div>
              <div className="entry-subheader">
                {edu.degree} {edu.field && `in ${edu.field}`}
              </div>
            </div>
          ))}
        </div>
      )}

      {(data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.tools.length > 0) && (
        <div className="resume-section">
          <h2>Skills</h2>
          {data.skills.technical.length > 0 && (
            <div className="skill-group">
              <strong>Technical:</strong>
              <div className="skill-pills">
                {data.skills.technical.map((skill, idx) => (
                  <span key={idx} className="skill-pill">{skill}</span>
                ))}
              </div>
            </div>
          )}
          {data.skills.soft.length > 0 && (
            <div className="skill-group">
              <strong>Soft Skills:</strong>
              <div className="skill-pills">
                {data.skills.soft.map((skill, idx) => (
                  <span key={idx} className="skill-pill">{skill}</span>
                ))}
              </div>
            </div>
          )}
          {data.skills.tools.length > 0 && (
            <div className="skill-group">
              <strong>Tools & Technologies:</strong>
              <div className="skill-pills">
                {data.skills.tools.map((skill, idx) => (
                  <span key={idx} className="skill-pill">{skill}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ResumePreview
