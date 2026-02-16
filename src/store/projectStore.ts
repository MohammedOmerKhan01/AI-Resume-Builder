type Artifact = {
  file: File | null
  uploadedAt: string | null
}

type TestResult = {
  id: string
  name: string
  passed: boolean
}

type ProjectState = {
  artifacts: Record<string, Artifact>
  lovableLink: string
  githubLink: string
  deployLink: string
  testResults: TestResult[]
}

const STORAGE_KEY = 'rb_final_submission'

const DEFAULT_TESTS: TestResult[] = [
  { id: 'test1', name: 'LocalStorage persistence', passed: false },
  { id: 'test2', name: 'Live preview updates', passed: false },
  { id: 'test3', name: 'Template switching preserves data', passed: false },
  { id: 'test4', name: 'Color theme persists after refresh', passed: false },
  { id: 'test5', name: 'ATS score calculates correctly', passed: false },
  { id: 'test6', name: 'Score updates live on edit', passed: false },
  { id: 'test7', name: 'Export buttons work', passed: false },
  { id: 'test8', name: 'Empty states handled gracefully', passed: false },
  { id: 'test9', name: 'Mobile responsive layout works', passed: false },
  { id: 'test10', name: 'No console errors on any page', passed: false }
]

class ProjectStore {
  private state: ProjectState = {
    artifacts: {},
    lovableLink: '',
    githubLink: '',
    deployLink: '',
    testResults: [...DEFAULT_TESTS]
  }

  private listeners: Set<() => void> = new Set()

  constructor() {
    this.loadFromStorage()
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        this.state = {
          ...this.state,
          lovableLink: parsed.lovableLink || '',
          githubLink: parsed.githubLink || '',
          deployLink: parsed.deployLink || '',
          testResults: parsed.testResults || [...DEFAULT_TESTS]
        }
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error)
    }
  }

  private saveToStorage() {
    try {
      const dataToSave = {
        lovableLink: this.state.lovableLink,
        githubLink: this.state.githubLink,
        deployLink: this.state.deployLink,
        testResults: this.state.testResults
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private notify() {
    this.listeners.forEach(listener => listener())
    this.saveToStorage()
  }

  getState() {
    return this.state
  }

  uploadArtifact(step: number, file: File) {
    this.state = {
      ...this.state,
      artifacts: {
        ...this.state.artifacts,
        [`rb_step_${step}_artifact`]: {
          file,
          uploadedAt: new Date().toISOString()
        }
      }
    }
    this.notify()
  }

  hasArtifact(step: number): boolean {
    return !!this.state.artifacts[`rb_step_${step}_artifact`]?.file
  }

  canAccessStep(step: number): boolean {
    if (step === 1) return true
    return this.hasArtifact(step - 1)
  }

  setLovableLink(link: string) {
    this.state = {
      ...this.state,
      lovableLink: link
    }
    this.notify()
  }

  setGithubLink(link: string) {
    this.state = {
      ...this.state,
      githubLink: link
    }
    this.notify()
  }

  setDeployLink(link: string) {
    this.state = {
      ...this.state,
      deployLink: link
    }
    this.notify()
  }

  toggleTestResult(testId: string) {
    const testIndex = this.state.testResults.findIndex(t => t.id === testId)
    if (testIndex !== -1) {
      const newTestResults = [...this.state.testResults]
      newTestResults[testIndex] = {
        ...newTestResults[testIndex],
        passed: !newTestResults[testIndex].passed
      }
      this.state = {
        ...this.state,
        testResults: newTestResults
      }
      this.notify()
    }
  }

  allTestsPassed(): boolean {
    return this.state.testResults.every(test => test.passed)
  }

  allStepsComplete(): boolean {
    return [1, 2, 3, 4, 5, 6, 7, 8].every(step => this.hasArtifact(step))
  }

  allLinksProvided(): boolean {
    return !!(
      this.state.lovableLink &&
      this.state.githubLink &&
      this.state.deployLink &&
      this.isValidUrl(this.state.lovableLink) &&
      this.isValidUrl(this.state.githubLink) &&
      this.isValidUrl(this.state.deployLink)
    )
  }

  isShipped(): boolean {
    return this.allStepsComplete() && this.allTestsPassed() && this.allLinksProvided()
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }
}

export const projectStore = new ProjectStore()
