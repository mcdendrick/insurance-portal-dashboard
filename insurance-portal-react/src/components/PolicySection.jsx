import { useState, useMemo } from 'react'
import './PolicySection.css'

const policies = [
  {
    id: 'gl',
    type: 'General Liability',
    number: 'GL-1234567',
    status: 'Active',
    dates: '01/15/24 — 01/15/25',
    amount: '$1,200',
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
    number: 'P-7654321',
    status: 'Renewing',
    dates: '04/01/24 — 04/01/25',
    amount: '$5,500',
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
    number: 'WC-1111111',
    status: 'Active',
    dates: '07/01/24 — 07/01/25',
    amount: '$2,000',
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
    number: 'A-1231231',
    status: 'Cancelled',
    dates: '01/01/24 — 01/01/25',
    amount: '$800',
    details: [
      { label: 'Status', value: 'Cancelled' },
      { label: 'Cancellation Date', value: '01/01/25' },
      { label: 'Note', value: 'Contact agent for renewal options' }
    ]
  }
]

function PolicySection({ searchQuery = '' }) {
  const [expandedPolicy, setExpandedPolicy] = useState(null)

  // Elastic search functionality
  const filteredPolicies = useMemo(() => {
    if (!searchQuery.trim()) {
      return policies
    }

    const query = searchQuery.toLowerCase().trim()
    
    return policies.filter(policy => {
      // Search in policy type
      const typeMatch = policy.type.toLowerCase().includes(query)
      
      // Search in policy number
      const numberMatch = policy.number.toLowerCase().includes(query)
      
      // Search in status
      const statusMatch = policy.status.toLowerCase().includes(query)
      
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

      return typeMatch || numberMatch || statusMatch || fuzzyMatches
    })
  }, [searchQuery])

  const togglePolicy = (id) => {
    setExpandedPolicy(expandedPolicy === id ? null : id)
  }

  return (
    <section className="policies-section">
      <div className="section-header">
        <h2>Policy</h2>
        {searchQuery && (
          <div className="search-results-info">
            {filteredPolicies.length} of {policies.length} policies found for "{searchQuery}"
          </div>
        )}
        {/* Debug indicator */}
        <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>
          {searchQuery ? `🔍 Searching: "${searchQuery}"` : '💡 Try searching for "GL", "Property", "Active", etc.'}
        </div>
      </div>
      
      {filteredPolicies.length === 0 && searchQuery ? (
        <div className="no-results">
          <div className="no-results-content">
            <div className="no-results-icon">🔍</div>
            <h3>No policies found</h3>
            <p>No policies match your search for "{searchQuery}"</p>
            <div className="search-suggestions">
              <strong>Try searching for:</strong>
              <ul>
                <li>Policy types: "General", "Property", "Workers", "Auto"</li>
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
                {policy.details.map((detail, index) => (
                  <div key={index} className="detail-item">
                    <span className="detail-label">{detail.label}:</span>
                    <span className="detail-value">{detail.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </section>
  )
}

export default PolicySection