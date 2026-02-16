import { Link } from 'react-router-dom'
import './HomePage.css'

function HomePage() {
  return (
    <div className="home-page">
      <div className="home-content">
        <h1 className="home-headline">Build a Resume That Gets Read.</h1>
        <p className="home-subheadline">
          Create a professional resume with our clean, minimal builder. 
          No distractions, just results.
        </p>
        <Link to="/builder" className="home-cta">
          Start Building
        </Link>

        <div className="home-sections">
          <div className="home-section">
            <h2>AI Resume Builder</h2>
            <div className="home-links">
              <Link to="/builder" className="home-link">Builder</Link>
              <Link to="/preview" className="home-link">Preview</Link>
              <Link to="/proof" className="home-link">Proof</Link>
            </div>
          </div>

          <div className="home-section">
            <h2>KodNest Build System</h2>
            <div className="home-links">
              <Link to="/rb/01-problem" className="home-link">01 - Problem</Link>
              <Link to="/rb/02-market" className="home-link">02 - Market</Link>
              <Link to="/rb/03-architecture" className="home-link">03 - Architecture</Link>
              <Link to="/rb/04-hld" className="home-link">04 - HLD</Link>
              <Link to="/rb/05-lld" className="home-link">05 - LLD</Link>
              <Link to="/rb/06-build" className="home-link">06 - Build</Link>
              <Link to="/rb/07-test" className="home-link">07 - Test</Link>
              <Link to="/rb/08-ship" className="home-link">08 - Ship</Link>
              <Link to="/rb/proof" className="home-link">Proof</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
