// Quick ATS Scoring Test
// Run this in browser console on http://localhost:5173/builder

console.log('🧪 Starting ATS Scoring Tests...\n');

// Test data
const tests = [
  {
    name: 'Empty Resume',
    data: {
      personalInfo: { name: '', email: '', phone: '', location: '' },
      summary: '',
      education: [],
      experience: [],
      projects: [],
      skills: { technical: [], soft: [], tools: [] },
      links: { github: '', linkedin: '' }
    },
    expectedScore: 0,
    expectedLevel: 'needs-work'
  },
  {
    name: 'Name Only',
    data: {
      personalInfo: { name: 'John Doe', email: '', phone: '', location: '' },
      summary: '',
      education: [],
      experience: [],
      projects: [],
      skills: { technical: [], soft: [], tools: [] },
      links: { github: '', linkedin: '' }
    },
    expectedScore: 10,
    expectedLevel: 'needs-work'
  },
  {
    name: 'Name + Email',
    data: {
      personalInfo: { name: 'John Doe', email: 'john@example.com', phone: '', location: '' },
      summary: '',
      education: [],
      experience: [],
      projects: [],
      skills: { technical: [], soft: [], tools: [] },
      links: { github: '', linkedin: '' }
    },
    expectedScore: 20,
    expectedLevel: 'needs-work'
  },
  {
    name: 'Basic Info + Summary',
    data: {
      personalInfo: { name: 'John Doe', email: 'john@example.com', phone: '555-1234', location: 'SF' },
      summary: 'I built scalable web applications with modern technologies and improved team productivity.',
      education: [],
      experience: [],
      projects: [],
      skills: { technical: [], soft: [], tools: [] },
      links: { github: '', linkedin: '' }
    },
    expectedScore: 45,
    expectedLevel: 'getting-there'
  },
  {
    name: 'Complete Resume',
    data: {
      personalInfo: { name: 'John Doe', email: 'john@example.com', phone: '555-1234', location: 'SF' },
      summary: 'I built scalable web applications with modern technologies and improved team productivity.',
      education: [{ id: '1', school: 'MIT', degree: 'BS', field: 'CS', startDate: '2015', endDate: '2019' }],
      experience: [{ id: '1', company: 'Tech Co', position: 'Engineer', startDate: '2020', endDate: '2024', description: 'Led development of features' }],
      projects: [{ id: '1', title: 'Project', description: 'Built app', techStack: ['React'], liveUrl: '', githubUrl: '' }],
      skills: { technical: ['React', 'Node', 'Python', 'SQL', 'AWS'], soft: [], tools: [] },
      links: { github: 'github.com/john', linkedin: 'linkedin.com/in/john' }
    },
    expectedScore: 100,
    expectedLevel: 'strong'
  }
];

// Run tests
let passed = 0;
let failed = 0;

tests.forEach((test, index) => {
  console.log(`\n📝 Test ${index + 1}: ${test.name}`);
  
  // You would need to import and call calculateATSScore here
  // For now, this is a template for manual testing
  
  console.log(`   Expected Score: ${test.expectedScore}`);
  console.log(`   Expected Level: ${test.expectedLevel}`);
  console.log(`   ✅ Manual verification required`);
});

console.log('\n\n📊 Test Summary:');
console.log(`   Total Tests: ${tests.length}`);
console.log(`   ⚠️  Manual verification required for all tests`);
console.log('\n💡 To test manually:');
console.log('   1. Fill in the form according to each test case');
console.log('   2. Check the ATS score matches expected value');
console.log('   3. Verify the color/level is correct');
console.log('\n✅ Test script loaded successfully!');
