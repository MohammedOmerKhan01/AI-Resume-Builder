import { useState, useEffect } from 'react'
import Navigation from '../components/Navigation.tsx'
import { resumeStore } from '../store/resumeStore'
import ResumePreview from '../components/ResumePreview.tsx'
import TemplatePicker from '../components/TemplatePicker.tsx'
import ATSScore from '../components/ATSScore.tsx'
import { generatePlainText, copyToClipboard, validateResume } from '../utils/exportUtils'
import { calculateATSScore } from '../utils/atsScoring'
import './PreviewPage.css'

function PreviewPage() {
  const [data, setData] = useState(resumeStore.getState())
  const [copied, setCopied] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [showPdfToast, setShowPdfToast] = useState(false)
  const atsScore = calculateATSScore(data)

  useEffect(() => {
    const unsubscribe = resumeStore.subscribe(() => {
      setData(resumeStore.getState())
    })
    return () => {
      unsubscribe()
    }
  }, [])

  const handlePrint = () => {
    const validation = validateResume(data)
    if (!validation.isValid) {
      setShowWarning(true)
      setTimeout(() => setShowWarning(false), 5000)
    }
    setShowPdfToast(true)
    setTimeout(() => setShowPdfToast(false), 3000)
    window.print()
  }

  const handleCopyText = async () => {
    const validation = validateResume(data)
    if (!validation.isValid) {
      setShowWarning(true)
      setTimeout(() => setShowWarning(false), 5000)
    }
    
    const plainText = generatePlainText(data)
    await copyToClipboard(plainText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const validation = validateResume(data)

  return (
    <div className="preview-page">
      <Navigation />
      
      <div className="preview-container">
        <div className="preview-header">
          <ATSScore score={atsScore} />
          
          <TemplatePicker 
            selectedTemplate={data.template}
            selectedColor={data.colorTheme}
            onTemplateSelect={(template) => resumeStore.setTemplate(template)}
            onColorSelect={(color) => resumeStore.setColorTheme(color)}
          />
          
          <div className="export-buttons">
            <button className="export-btn print-btn" onClick={handlePrint}>
              Print / Save as PDF
            </button>
            <button 
              className={`export-btn copy-btn ${copied ? 'copied' : ''}`}
              onClick={handleCopyText}
            >
              {copied ? '✓ Copied!' : 'Copy Resume as Text'}
            </button>
          </div>

          {showWarning && !validation.isValid && (
            <div className="export-warning">
              ⚠️ Your resume may look incomplete: {validation.warnings.join(', ')}
            </div>
          )}

          {showPdfToast && (
            <div className="pdf-toast">
              ✓ PDF export ready! Check your downloads.
            </div>
          )}
        </div>
        
        <div className="preview-content">
          <ResumePreview data={data} showGuidance={false} />
        </div>
      </div>
    </div>
  )
}

export default PreviewPage
