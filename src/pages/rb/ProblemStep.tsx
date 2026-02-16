function ProblemStep() {
  return (
    <div>
      <h1 style={{ fontSize: '32px', marginBottom: '16px', color: '#1a1a1a' }}>01 — Problem Definition</h1>
      <p style={{ color: '#666', marginBottom: '24px', lineHeight: '1.6' }}>
        Define the core problem your AI Resume Builder will solve. What pain points do job seekers face 
        when creating resumes? How will AI assistance improve their experience?
      </p>
      
      <div style={{ background: '#F7F6F3', padding: '24px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
        <h3 style={{ marginBottom: '16px', color: '#1a1a1a' }}>Key Questions to Address:</h3>
        <ul style={{ lineHeight: '2', color: '#333', paddingLeft: '20px' }}>
          <li>What specific resume creation challenges exist?</li>
          <li>Who is your target user?</li>
          <li>What makes this solution unique?</li>
          <li>What is the core value proposition?</li>
        </ul>
      </div>
    </div>
  )
}

export default ProblemStep
