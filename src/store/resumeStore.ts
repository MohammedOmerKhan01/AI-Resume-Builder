export type ColorTheme = 'teal' | 'navy' | 'burgundy' | 'forest' | 'charcoal'

export const COLOR_THEMES: Record<ColorTheme, string> = {
  teal: 'hsl(168, 60%, 40%)',
  navy: 'hsl(220, 60%, 35%)',
  burgundy: 'hsl(345, 60%, 35%)',
  forest: 'hsl(150, 50%, 30%)',
  charcoal: 'hsl(0, 0%, 25%)'
}

export type ResumeData = {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
  }
  summary: string
  education: Array<{
    id: string
    school: string
    degree: string
    field: string
    startDate: string
    endDate: string
  }>
  experience: Array<{
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    description: string
  }>
  projects: Array<{
    id: string
    title: string
    description: string
    techStack: string[]
    liveUrl: string
    githubUrl: string
  }>
  skills: {
    technical: string[]
    soft: string[]
    tools: string[]
  }
  links: {
    github: string
    linkedin: string
  }
  template: 'classic' | 'modern' | 'minimal'
  colorTheme: ColorTheme
}

const STORAGE_KEY = 'resumeBuilderData'

const ACTION_VERBS = [
  'built', 'developed', 'designed', 'implemented', 'led', 'improved',
  'created', 'optimized', 'automated', 'managed', 'launched', 'delivered',
  'architected', 'established', 'increased', 'reduced', 'achieved',
  'collaborated', 'coordinated', 'executed', 'maintained', 'migrated'
]

export function startsWithActionVerb(text: string): boolean {
  const firstWord = text.trim().split(/\s+/)[0]?.toLowerCase()
  return ACTION_VERBS.includes(firstWord)
}

export function containsNumbers(text: string): boolean {
  return /\d+[%kKmM]?|\d+\+/.test(text)
}

class ResumeStore {
  private state: ResumeData = {
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: ''
    },
    summary: '',
    education: [],
    experience: [],
    projects: [],
    skills: {
      technical: [],
      soft: [],
      tools: []
    },
    links: {
      github: '',
      linkedin: ''
    },
    template: 'classic',
    colorTheme: 'teal'
  }

  private listeners: Set<() => void> = new Set()
  private saveTimeout: number | null = null

  constructor() {
    this.loadFromStorage()
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        console.log('Loading data from localStorage:', parsed)
        
        // Migrate old data format to new format
        if (typeof parsed.skills === 'string') {
          console.log('Migrating old skills format...')
          const oldSkills = parsed.skills.split(',').map((s: string) => s.trim()).filter((s: string) => s.length > 0)
          parsed.skills = {
            technical: oldSkills,
            soft: [],
            tools: []
          }
        }
        
        // Ensure skills object exists
        if (!parsed.skills || typeof parsed.skills !== 'object') {
          parsed.skills = {
            technical: [],
            soft: [],
            tools: []
          }
        }
        
        // Migrate old projects format
        if (parsed.projects && parsed.projects.length > 0) {
          console.log('Migrating projects format...')
          parsed.projects = parsed.projects.map((proj: any) => {
            if ('name' in proj || 'technologies' in proj) {
              return {
                id: proj.id || Date.now().toString(),
                title: proj.name || proj.title || '',
                description: proj.description || '',
                techStack: proj.technologies ? proj.technologies.split(',').map((t: string) => t.trim()).filter((t: string) => t.length > 0) : (proj.techStack || []),
                liveUrl: proj.liveUrl || '',
                githubUrl: proj.githubUrl || ''
              }
            }
            return proj
          })
        }
        
        this.state = parsed
        console.log('Data loaded successfully:', this.state)
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error)
      // Reset to default state on error
      this.state = {
        personalInfo: {
          name: '',
          email: '',
          phone: '',
          location: ''
        },
        summary: '',
        education: [],
        experience: [],
        projects: [],
        skills: {
          technical: [],
          soft: [],
          tools: []
        },
        links: {
          github: '',
          linkedin: ''
        },
        template: 'classic',
        colorTheme: 'teal'
      }
    }
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private notify() {
    this.listeners.forEach(listener => listener())
  }

  private notifyAndSave() {
    this.notify()
    // Debounced save - won't block typing
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout)
    }
    this.saveTimeout = window.setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state))
      } catch (error) {
        console.error('Failed to save to localStorage:', error)
      }
    }, 1000) // Increased to 1 second for better performance
  }

  getState() {
    return this.state
  }

  updatePersonalInfo(info: Partial<ResumeData['personalInfo']>) {
    this.state = {
      ...this.state,
      personalInfo: { ...this.state.personalInfo, ...info }
    }
    this.notifyAndSave()
  }

  updateSummary(summary: string) {
    this.state = {
      ...this.state,
      summary
    }
    this.notifyAndSave()
  }

  addEducation() {
    this.state = {
      ...this.state,
      education: [...this.state.education, {
        id: Date.now().toString(),
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: ''
      }]
    }
    this.notifyAndSave()
  }

  updateEducation(id: string, data: Partial<ResumeData['education'][0]>) {
    const index = this.state.education.findIndex(e => e.id === id)
    if (index !== -1) {
      const newEducation = [...this.state.education]
      newEducation[index] = { ...newEducation[index], ...data }
      this.state = {
        ...this.state,
        education: newEducation
      }
      this.notifyAndSave()
    }
  }

  removeEducation(id: string) {
    this.state = {
      ...this.state,
      education: this.state.education.filter(e => e.id !== id)
    }
    this.notifyAndSave()
  }

  addExperience() {
    this.state = {
      ...this.state,
      experience: [...this.state.experience, {
        id: Date.now().toString(),
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: ''
      }]
    }
    this.notifyAndSave()
  }

  updateExperience(id: string, data: Partial<ResumeData['experience'][0]>) {
    const index = this.state.experience.findIndex(e => e.id === id)
    if (index !== -1) {
      const newExperience = [...this.state.experience]
      newExperience[index] = { ...newExperience[index], ...data }
      this.state = {
        ...this.state,
        experience: newExperience
      }
      this.notifyAndSave()
    }
  }

  removeExperience(id: string) {
    this.state = {
      ...this.state,
      experience: this.state.experience.filter(e => e.id !== id)
    }
    this.notifyAndSave()
  }

  addProject() {
    this.state = {
      ...this.state,
      projects: [...this.state.projects, {
        id: Date.now().toString(),
        title: '',
        description: '',
        techStack: [],
        liveUrl: '',
        githubUrl: ''
      }]
    }
    this.notifyAndSave()
  }

  updateProject(id: string, data: Partial<ResumeData['projects'][0]>) {
    const index = this.state.projects.findIndex(p => p.id === id)
    if (index !== -1) {
      const newProjects = [...this.state.projects]
      newProjects[index] = { ...newProjects[index], ...data }
      this.state = {
        ...this.state,
        projects: newProjects
      }
      this.notifyAndSave()
    }
  }

  removeProject(id: string) {
    this.state = {
      ...this.state,
      projects: this.state.projects.filter(p => p.id !== id)
    }
    this.notifyAndSave()
  }

  addSkill(category: keyof ResumeData['skills'], skill: string) {
    if (!this.state.skills[category].includes(skill)) {
      this.state = {
        ...this.state,
        skills: {
          ...this.state.skills,
          [category]: [...this.state.skills[category], skill]
        }
      }
      this.notifyAndSave()
    }
  }

  removeSkill(category: keyof ResumeData['skills'], skill: string) {
    this.state = {
      ...this.state,
      skills: {
        ...this.state.skills,
        [category]: this.state.skills[category].filter(s => s !== skill)
      }
    }
    this.notifyAndSave()
  }

  suggestSkills() {
    this.state = {
      ...this.state,
      skills: {
        technical: [...new Set([...this.state.skills.technical, 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'GraphQL'])],
        soft: [...new Set([...this.state.skills.soft, 'Team Leadership', 'Problem Solving'])],
        tools: [...new Set([...this.state.skills.tools, 'Git', 'Docker', 'AWS'])]
      }
    }
    this.notifyAndSave()
  }

  updateLinks(links: Partial<ResumeData['links']>) {
    this.state = {
      ...this.state,
      links: { ...this.state.links, ...links }
    }
    this.notifyAndSave()
  }

  setTemplate(template: ResumeData['template']) {
    this.state = {
      ...this.state,
      template
    }
    this.notifyAndSave()
  }

  setColorTheme(colorTheme: ColorTheme) {
    this.state = {
      ...this.state,
      colorTheme
    }
    this.notifyAndSave()
  }

  loadSampleData() {
    this.state = {
      personalInfo: {
        name: 'Jane Smith',
        email: 'jane.smith@email.com',
        phone: '(555) 123-4567',
        location: 'San Francisco, CA'
      },
      summary: 'Experienced software engineer with 5+ years building scalable web applications. Passionate about clean code and user experience.',
      education: [{
        id: '1',
        school: 'Stanford University',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2015',
        endDate: '2019'
      }],
      experience: [{
        id: '1',
        company: 'Tech Corp',
        position: 'Senior Software Engineer',
        startDate: '2021',
        endDate: 'Present',
        description: 'Led development of customer-facing web applications serving 1M+ users. Improved performance by 40% through optimization.'
      }],
      projects: [{
        id: '1',
        title: 'AI Resume Builder',
        description: 'Built a web application that helps users create professional resumes with AI assistance',
        techStack: ['React', 'TypeScript', 'Node.js'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com/example/resume-builder'
      }],
      skills: {
        technical: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL'],
        soft: ['Team Leadership', 'Problem Solving', 'Communication'],
        tools: ['Git', 'Docker', 'AWS']
      },
      links: {
        github: 'github.com/janesmith',
        linkedin: 'linkedin.com/in/janesmith'
      },
      template: 'classic',
      colorTheme: 'teal'
    }
    this.notifyAndSave()
  }
}

export const resumeStore = new ResumeStore()
