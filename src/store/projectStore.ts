type Artifact = {
  file: File | null
  uploadedAt: string | null
}

type ProjectState = {
  artifacts: Record<string, Artifact>
  lovableLink: string
  githubLink: string
  deployLink: string
}

class ProjectStore {
  private state: ProjectState = {
    artifacts: {},
    lovableLink: '',
    githubLink: '',
    deployLink: ''
  }

  private listeners: Set<() => void> = new Set()

  subscribe(listener: () => void) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private notify() {
    this.listeners.forEach(listener => listener())
  }

  getState() {
    return this.state
  }

  uploadArtifact(step: number, file: File) {
    this.state.artifacts[`rb_step_${step}_artifact`] = {
      file,
      uploadedAt: new Date().toISOString()
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
    this.state.lovableLink = link
    this.notify()
  }

  setGithubLink(link: string) {
    this.state.githubLink = link
    this.notify()
  }

  setDeployLink(link: string) {
    this.state.deployLink = link
    this.notify()
  }
}

export const projectStore = new ProjectStore()
