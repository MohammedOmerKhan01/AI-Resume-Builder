function ShipStep() {
  return (
    <div>
      <h1 style={{ fontSize: '32px', marginBottom: '16px', color: '#1a1a1a' }}>08 — Ship & Deploy</h1>
      <p style={{ color: '#666', marginBottom: '24px', lineHeight: '1.6' }}>
        Deploy your AI Resume Builder to production! Set up hosting, configure your domain, 
        and make your application available to users.
      </p>
      
      <div style={{ background: '#F7F6F3', padding: '24px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
        <h3 style={{ marginBottom: '16px', color: '#1a1a1a' }}>Deployment Steps:</h3>
        <ul style={{ lineHeight: '2', color: '#333', paddingLeft: '20px' }}>
          <li>Choose hosting platform (Vercel, Netlify, etc.)</li>
          <li>Configure environment variables</li>
          <li>Set up custom domain (optional)</li>
          <li>Enable analytics and monitoring</li>
          <li>Create GitHub repository</li>
          <li>Document deployment process</li>
        </ul>
      </div>
    </div>
  )
}

export default ShipStep
