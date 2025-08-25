import { useState } from 'react'
import './Header.css'

function Header({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearch(query)
  }

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo">
            <div className="logo-icon"></div>
            <h1>ABC Contractors Dashboard</h1>
          </div>
        </div>
        
        <div className="header-actions">
          <div className="search-container">
            <div className="search-input-wrapper">
              <svg 
                className="search-icon" 
                width="18" 
                height="18" 
                viewBox="0 0 20 20" 
                fill="none"
              >
                <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16Z" stroke="currentColor" strokeWidth="2"/>
                <path d="m19 19-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search policies by type or number..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          
          <button className="menu-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header