import { ResumeData, ColorTheme, COLOR_THEMES } from '../store/resumeStore'
import './TemplatePicker.css'

type Props = {
  selectedTemplate: ResumeData['template']
  selectedColor: ColorTheme
  onTemplateSelect: (template: ResumeData['template']) => void
  onColorSelect: (color: ColorTheme) => void
}

function TemplatePicker({ selectedTemplate, selectedColor, onTemplateSelect, onColorSelect }: Props) {
  const templates: Array<{ id: ResumeData['template']; name: string; description: string }> = [
    { id: 'classic', name: 'Classic', description: 'Traditional single-column' },
    { id: 'modern', name: 'Modern', description: 'Two-column with sidebar' },
    { id: 'minimal', name: 'Minimal', description: 'Clean and spacious' }
  ]

  const colors: Array<{ id: ColorTheme; name: string }> = [
    { id: 'teal', name: 'Teal' },
    { id: 'navy', name: 'Navy' },
    { id: 'burgundy', name: 'Burgundy' },
    { id: 'forest', name: 'Forest' },
    { id: 'charcoal', name: 'Charcoal' }
  ]

  return (
    <div className="template-picker">
      <div className="picker-section">
        <h3>Template</h3>
        <div className="template-thumbnails">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`template-thumbnail ${selectedTemplate === template.id ? 'active' : ''}`}
              onClick={() => onTemplateSelect(template.id)}
            >
              <div className={`thumbnail-preview template-preview-${template.id}`}>
                {selectedTemplate === template.id && <div className="checkmark">✓</div>}
                {template.id === 'classic' && (
                  <div className="preview-content">
                    <div className="preview-line thick"></div>
                    <div className="preview-line"></div>
                    <div className="preview-line"></div>
                    <div className="preview-divider"></div>
                    <div className="preview-line"></div>
                    <div className="preview-line short"></div>
                  </div>
                )}
                {template.id === 'modern' && (
                  <div className="preview-content modern-layout">
                    <div className="preview-sidebar"></div>
                    <div className="preview-main">
                      <div className="preview-line thick"></div>
                      <div className="preview-line"></div>
                      <div className="preview-line short"></div>
                    </div>
                  </div>
                )}
                {template.id === 'minimal' && (
                  <div className="preview-content">
                    <div className="preview-line thick minimal"></div>
                    <div className="preview-line minimal"></div>
                    <div className="preview-line minimal"></div>
                    <div className="preview-spacer"></div>
                    <div className="preview-line minimal"></div>
                    <div className="preview-line short minimal"></div>
                  </div>
                )}
              </div>
              <div className="thumbnail-label">
                <strong>{template.name}</strong>
                <span>{template.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="picker-section">
        <h3>Color Theme</h3>
        <div className="color-circles">
          {colors.map((color) => (
            <div
              key={color.id}
              className={`color-circle ${selectedColor === color.id ? 'active' : ''}`}
              style={{ backgroundColor: COLOR_THEMES[color.id] }}
              onClick={() => onColorSelect(color.id)}
              title={color.name}
            >
              {selectedColor === color.id && <div className="checkmark-small">✓</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TemplatePicker
