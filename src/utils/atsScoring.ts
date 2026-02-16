import { ResumeData } from '../store/resumeStore'

export type ATSScore = {
  score: number
  level: 'needs-work' | 'getting-there' | 'strong'
  label: string
  suggestions: string[]
}

const ACTION_VERBS = [
  'built', 'led', 'designed', 'improved', 'developed', 'created', 'managed',
  'implemented', 'launched', 'optimized', 'increased', 'reduced', 'achieved',
  'delivered', 'established', 'coordinated', 'executed', 'architected'
]

function hasActionVerbs(text: string): boolean {
  const lowerText = text.toLowerCase()
  return ACTION_VERBS.some(verb => lowerText.includes(verb))
}

export function calculateATSScore(data: ResumeData): ATSScore {
  let score = 0
  const suggestions: string[] = []

  // +10 if name provided
  if (data.personalInfo.name.trim()) {
    score += 10
  } else {
    suggestions.push('Add your name (+10 points)')
  }

  // +10 if email provided
  if (data.personalInfo.email.trim()) {
    score += 10
  } else {
    suggestions.push('Add your email (+10 points)')
  }

  // +10 if summary > 50 chars
  if (data.summary.trim().length > 50) {
    score += 10
  } else {
    suggestions.push('Add a professional summary (+10 points)')
  }

  // +15 if at least 1 experience entry with bullets
  if (data.experience.length >= 1 && data.experience.some(exp => exp.description.trim())) {
    score += 15
  } else if (data.experience.length === 0) {
    suggestions.push('Add work experience (+15 points)')
  } else {
    suggestions.push('Add description to your experience (+15 points)')
  }

  // +10 if at least 1 education entry
  if (data.education.length >= 1) {
    score += 10
  } else {
    suggestions.push('Add education details (+10 points)')
  }

  // +10 if at least 5 skills added
  const totalSkills = data.skills.technical.length + data.skills.soft.length + data.skills.tools.length
  if (totalSkills >= 5) {
    score += 10
  } else {
    suggestions.push(`Add ${5 - totalSkills} more skills (+10 points)`)
  }

  // +10 if at least 1 project added
  if (data.projects.length >= 1) {
    score += 10
  } else {
    suggestions.push('Add at least 1 project (+10 points)')
  }

  // +5 if phone provided
  if (data.personalInfo.phone.trim()) {
    score += 5
  } else {
    suggestions.push('Add phone number (+5 points)')
  }

  // +5 if LinkedIn provided
  if (data.links.linkedin.trim()) {
    score += 5
  } else {
    suggestions.push('Add LinkedIn profile (+5 points)')
  }

  // +5 if GitHub provided
  if (data.links.github.trim()) {
    score += 5
  } else {
    suggestions.push('Add GitHub profile (+5 points)')
  }

  // +10 if summary contains action verbs
  if (data.summary.trim() && hasActionVerbs(data.summary)) {
    score += 10
  } else if (data.summary.trim()) {
    suggestions.push('Use action verbs in summary (+10 points)')
  }

  // Determine level and label
  let level: 'needs-work' | 'getting-there' | 'strong'
  let label: string

  if (score <= 40) {
    level = 'needs-work'
    label = 'Needs Work'
  } else if (score <= 70) {
    level = 'getting-there'
    label = 'Getting There'
  } else {
    level = 'strong'
    label = 'Strong Resume'
  }

  return {
    score: Math.min(score, 100),
    level,
    label,
    suggestions: suggestions.slice(0, 5)
  }
}
