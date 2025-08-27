import { useState, useMemo } from 'react'
import './PolicySection.css'

const policies = [
  {
    id: 'gl',
    type: 'General Liability',
    carrier: { name: 'The Hartford', website: 'https://www.thehartford.com' },
    number: 'GL-1234567',
    status: 'Active',
    dates: '01/15/24 — 01/15/25',
    amount: '$1,200',
    year: '2025',
    details: [
      { label: 'Aggregate', value: '$1,000,000' },
      { label: 'General Aggregate', value: '$2,000,000' },
      { label: 'Products/Completed Operations', value: '$2,000,000' },
      { label: 'Personal and Advertising Injury', value: '$2,000,000' },
      { label: 'Medical Expenses', value: '$10,000' },
      { label: 'Sales Rated', value: '$3,500,000' }
    ]
  },
  {
    id: 'prop',
    type: 'Property',
    carrier: { name: 'Travelers', website: 'https://www.travelers.com' },
    number: 'P-7654321',
    status: 'Renewing',
    dates: '04/01/24 — 04/01/25',
    amount: '$5,500',
    year: '2025',
    details: [
      { label: 'Location', value: '5555 Ventura Blvd, Sherman Oaks, CA' },
      { label: 'Building', value: '$750,000' },
      { label: 'Business Personal Property', value: '$200,000' },
      { label: 'Business Income', value: '$300,000' },
      { label: 'Deductible', value: '$2,000' }
    ]
  },
  {
    id: 'wc',
    type: "Workers' Comp",
    carrier: { name: 'Nationwide', website: 'https://www.nationwide.com' },
    number: 'WC-1111111',
    status: 'Active',
    dates: '07/01/24 — 07/01/25',
    amount: '$2,000',
    year: '2025',
    details: [
      { label: 'Each Accident Limit', value: '$1,000,000' },
      { label: 'Disease Policy Limit', value: '$1,000,000' },
      { label: 'Disease Each Employee', value: '$1,000,000' },
      { label: 'Classification', value: 'Fast Casual' },
      { label: 'Annual Payroll', value: '$150,000' }
    ]
  },
  {
    id: 'auto',
    type: 'Auto',
    carrier: { name: 'The Hartford', website: 'https://www.thehartford.com' },
    number: 'A-1231231',
    status: 'Cancelled',
    dates: '01/01/24 — 01/01/25',
    amount: '$800',
    year: '2024',
    details: [
      { label: 'Status', value: 'Cancelled' },
      { label: 'Cancellation Date', value: '01/01/25' },
      { label: 'Note', value: 'Contact agent for renewal options' }
    ]
  }
]

function PolicySection({ searchQuery = '' }) {
  const [expandedPolicy, setExpandedPolicy] = useState(null)
  const [selectedYear, setSelectedYear] = useState('2025')

  const availableYears = ['All Years', '2025', '2024', '2023']

  // Filter by year and search query
  const filteredPolicies = useMemo(() => {
    let filtered = policies

    // Filter by year first (skip filtering if "All Years" is selected)
    if (selectedYear && selectedYear !== 'All Years') {
      filtered = filtered.filter(policy => policy.year === selectedYear)
    }

    // Then apply search filter
    if (!searchQuery.trim()) {
      return filtered
    }

    const query = searchQuery.toLowerCase().trim()
    
    return filtered.filter(policy => {
      // Search in policy type
      const typeMatch = policy.type.toLowerCase().includes(query)
      
      // Search in policy number
      const numberMatch = policy.number.toLowerCase().includes(query)
      
      // Search in status
      const statusMatch = policy.status.toLowerCase().includes(query)

      // Search in carrier
      const carrierMatch = policy.carrier.name.toLowerCase().includes(query)
      
      // Fuzzy matching for common terms
      const fuzzyMatches = [
        // Abbreviations and common terms
        (query.includes('gl') || query.includes('general')) && policy.type.toLowerCase().includes('general'),
        (query.includes('wc') || query.includes('workers') || query.includes('comp')) && policy.type.toLowerCase().includes('workers'),
        (query.includes('prop') || query.includes('property')) && policy.type.toLowerCase().includes('property'),
        query.includes('auto') && policy.type.toLowerCase().includes('auto'),
        
        // Status fuzzy matching
        (query.includes('active') || query.includes('act')) && policy.status.toLowerCase() === 'active',
        (query.includes('cancel') || query.includes('canc')) && policy.status.toLowerCase() === 'cancelled',
        (query.includes('renew') || query.includes('ren')) && policy.status.toLowerCase() === 'renewing'
      ].some(Boolean)

      return typeMatch || numberMatch || statusMatch || carrierMatch || fuzzyMatches
    })
  }, [searchQuery, selectedYear])

  const togglePolicy = (id) => {
    setExpandedPolicy(expandedPolicy === id ? null : id)
  }

  const downloadPolicy = (policyNumber) => {
    // Simulate download
    alert(`Downloading policy ${policyNumber}...`)
  }

  return (
    <section className="policies-section">
      <div className="section-header">
        <div className="section-title-row">
          <h2>Policies</h2>
          <div className="year-filter">
            <label htmlFor="year-select">Year:</label>
            <select 
              id="year-select"
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
              className="year-dropdown"
            >
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        
        {searchQuery && (
          <div className="search-results-info">
            {filteredPolicies.length} policies found for "{searchQuery}" {selectedYear === 'All Years' ? 'across all years' : `in ${selectedYear}`}
          </div>
        )}
      </div>

      {/* Policy Headers */}
      <div className="policy-headers">
        <div className="header-row">
          <div className="header-carrier">Carrier</div>
          <div className="header-type">Policy Type</div>
          <div className="header-number">Policy Number</div>
          <div className="header-status">Status</div>
          <div className="header-dates">Term</div>
          <div className="header-amount">Premium</div>
          <div className="header-actions"></div>
        </div>
      </div>
      
      {filteredPolicies.length === 0 && searchQuery ? (
        <div className="no-results">
          <div className="no-results-content">
            <div className="no-results-icon">🔍</div>
            <h3>No policies found</h3>
            <p>No policies match your search for "{searchQuery}" {selectedYear === 'All Years' ? 'across all years' : `in ${selectedYear}`}</p>
            <div className="search-suggestions">
              <strong>Try searching for:</strong>
              <ul>
                <li>Policy types: "General", "Property", "Workers", "Auto"</li>
                <li>Carriers: "Hartford", "Travelers", "Nationwide"</li>
                <li>Policy numbers: "GL-", "P-", "WC-", "A-"</li>
                <li>Status: "Active", "Cancelled", "Renewing"</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        filteredPolicies.map(policy => (
          <div key={policy.id} className={`policy-card ${expandedPolicy === policy.id ? 'expanded' : ''}`}>
            <div className="policy-header" onClick={() => togglePolicy(policy.id)}>
              <div className="policy-info">
                <div className="policy-carrier">
                  <a 
                    href={policy.carrier.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="carrier-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {policy.carrier.name}
                  </a>
                </div>
                <span className="policy-type">{policy.type}</span>
                <span className="policy-number">{policy.number}</span>
                <span className={`policy-status ${policy.status.toLowerCase()}`}>{policy.status}</span>
                <span className="policy-dates">{policy.dates}</span>
                <span className="policy-amount">{policy.amount}</span>
              </div>
              <div className="dropdown-arrow">
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none"
                  style={{ 
                    transform: expandedPolicy === policy.id ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  <path 
                    d="M4 6L8 10L12 6" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            {expandedPolicy === policy.id && (
              <div className="policy-details">
                <div className="details-grid">
                  {policy.details.map((detail, index) => (
                    <div key={index} className="detail-item">
                      <span className="detail-label">{detail.label}:</span>
                      <span className="detail-value">{detail.value}</span>
                    </div>
                  ))}
                </div>
                <div className="policy-actions-bottom">
                  <button 
                    className="change-policy-btn"
                    onClick={() => alert(`Change policy ${policy.number} - Coming soon!`)}
                  >
                    ✏️ Change Policy
                  </button>
                  <button 
                    className="download-btn"
                    onClick={() => downloadPolicy(policy.number)}
                  >
                    📄 Download Policy
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </section>
  )
}

export default PolicySection