function HLDStep() {
  return (
    <div>
      <h1 style={{ fontSize: '32px', marginBottom: '16px', color: '#1a1a1a' }}>04 — High-Level Design</h1>
      <p style={{ color: '#666', marginBottom: '24px', lineHeight: '1.6' }}>
        Create a high-level design document outlining the major modules, their interactions, 
        and the overall system flow.
      </p>
      
      <div style={{ background: '#F7F6F3', padding: '24px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
        <h3 style={{ marginBottom: '16px', color: '#1a1a1a' }}>HLD Elements:</h3>
        <ul style={{ lineHeight: '2', color: '#333', paddingLeft: '20px' }}>
          <li>Module breakdown and responsibilities</li>
          <li>API endpoints and data contracts</li>
          <li>User authentication and authorization flow</li>
          <li>Template management system</li>
          <li>AI content generation pipeline</li>
          <li>Export and download mechanisms</li>
        </ul>
      </div>
    </div>
  )
}

export default HLDStep
