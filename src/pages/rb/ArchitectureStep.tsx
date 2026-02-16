function ArchitectureStep() {
  return (
    <div>
      <h1 style={{ fontSize: '32px', marginBottom: '16px', color: '#1a1a1a' }}>03 — System Architecture</h1>
      <p style={{ color: '#666', marginBottom: '24px', lineHeight: '1.6' }}>
        Design the overall system architecture for your AI Resume Builder. Define the major components, 
        data flow, and technology stack.
      </p>
      
      <div style={{ background: '#F7F6F3', padding: '24px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
        <h3 style={{ marginBottom: '16px', color: '#1a1a1a' }}>Architecture Components:</h3>
        <ul style={{ lineHeight: '2', color: '#333', paddingLeft: '20px' }}>
          <li>Frontend framework and UI components</li>
          <li>Backend services and APIs</li>
          <li>AI/ML integration for content generation</li>
          <li>Database design for user data and templates</li>
          <li>PDF generation service</li>
        </ul>
      </div>
    </div>
  )
}

export default ArchitectureStep
