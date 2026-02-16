import { Link, useLocation } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
  const location = useLocation()

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">AI Resume Builder</Link>
        <div className="nav-links">
          <Link 
            to="/builder" 
            className={`nav-link ${location.pathname === '/builder' ? 'active' : ''}`}
          >
            Builder
          </Link>
          <Link 
            to="/preview" 
            className={`nav-link ${location.pathname === '/preview' ? 'active' : ''}`}
          >
            Preview
          </Link>
          <Link 
            to="/proof" 
            className={`nav-link ${location.pathname === '/proof' ? 'active' : ''}`}
          >
            Proof
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
