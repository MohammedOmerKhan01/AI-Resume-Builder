import { ResumeData } from '../store/resumeStore'

export function generatePlainText(data: ResumeData): string {
  let text = ''

  // Name and Contact
  if (data.personalInfo.name) {
    text += `${data.personalInfo.name}\n`
  }
  
  const contact = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location
  ].filter(Boolean).join(' | ')
  
  if (contact) {
    text += `${contact}\n`
  }
  
  text += '\n'

  // Summary
  if (data.summary) {
    text += 'SUMMARY\n'
    text += `${data.summary}\n\n`
  }

  // Links
  if (data.links.github || data.links.linkedin) {
    text += 'LINKS\n'
    if (data.links.github) text += `GitHub: ${data.links.github}\n`
    if (data.links.linkedin) text += `LinkedIn: ${data.links.linkedin}\n`
    text += '\n'
  }

  // Experience
  if (data.experience.length > 0) {
    text += 'EXPERIENCE\n'
    data.experience.forEach(exp => {
      text += `${exp.position} at ${exp.company}\n`
      if (exp.startDate || exp.endDate) {
        text += `${exp.startDate} - ${exp.endDate}\n`
      }
      if (exp.description) {
        text += `${exp.description}\n`
      }
      text += '\n'
    })
  }

  // Projects
  if (data.projects.length > 0) {
    text += 'PROJECTS\n'
    data.projects.forEach(proj => {
      text += `${proj.title}\n`
      if (proj.description) {
        text += `${proj.description}\n`
      }
      if (proj.techStack.length > 0) {
        text += `Technologies: ${proj.techStack.join(', ')}\n`
      }
      if (proj.liveUrl) {
        text += `Live: ${proj.liveUrl}\n`
      }
      if (proj.githubUrl) {
        text += `GitHub: ${proj.githubUrl}\n`
      }
      text += '\n'
    })
  }

  // Education
  if (data.education.length > 0) {
    text += 'EDUCATION\n'
    data.education.forEach(edu => {
      text += `${edu.school}\n`
      text += `${edu.degree} in ${edu.field}\n`
      if (edu.startDate || edu.endDate) {
        text += `${edu.startDate} - ${edu.endDate}\n`
      }
      text += '\n'
    })
  }

  // Skills
  const allSkills = [
    ...data.skills.technical,
    ...data.skills.soft,
    ...data.skills.tools
  ]
  if (allSkills.length > 0) {
    text += 'SKILLS\n'
    if (data.skills.technical.length > 0) {
      text += `Technical: ${data.skills.technical.join(', ')}\n`
    }
    if (data.skills.soft.length > 0) {
      text += `Soft Skills: ${data.skills.soft.join(', ')}\n`
    }
    if (data.skills.tools.length > 0) {
      text += `Tools: ${data.skills.tools.join(', ')}\n`
    }
  }

  return text.trim()
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text)
}

export function validateResume(data: ResumeData): { isValid: boolean; warnings: string[] } {
  const warnings: string[] = []

  if (!data.personalInfo.name) {
    warnings.push('Missing name')
  }

  if (data.experience.length === 0 && data.projects.length === 0) {
    warnings.push('No projects or experience added')
  }

  return {
    isValid: warnings.length === 0,
    warnings
  }
}
