import { ResumeData } from '../store/resumeStore'
import './TemplateSelector.css'

type Props = {
  selected: ResumeData['template']
  onSelect: (template: ResumeData['template']) => void
}

function TemplateSelector({ selected, onSelect }: Props) {
  const templates: Array<{ id: ResumeData['template']; name: string }> = [
    { id: 'classic', name: 'Classic' },
    { id: 'modern', name: 'Modern' },
    { id: 'minimal', name: 'Minimal' }
  ]

  return (
    <div className="template-selector">
      {templates.map(template => (
        <button
          key={template.id}
          className={`template-btn ${selected === template.id ? 'active' : ''}`}
          onClick={() => onSelect(template.id)}
        >
          {template.name}
        </button>
      ))}
    </div>
  )
}

export default TemplateSelector
