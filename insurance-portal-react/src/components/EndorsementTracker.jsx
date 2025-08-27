import { useState } from 'react'
import './EndorsementTracker.css'

const endorsements = [
  {
    id: 'END-001',
    policy: 'GL-1234567',
    type: 'Coverage Increase',
    description: 'Increase General Aggregate to $3,000,000',
    status: 'In Progress',
    requestDate: '2024-03-01',
    effectiveDate: '2024-03-15',
    agent: 'John Doe'
  },
  {
    id: 'END-002',
    policy: 'P-7654321',
    type: 'Location Addition',
    description: 'Add new warehouse location at 789 Industrial Ave',
    status: 'Pending Underwriting',
    requestDate: '2024-02-28',
    effectiveDate: '2024-04-01',
    agent: 'John Doe'
  },
  {
    id: 'END-003',
    policy: 'WC-1111111',
    type: 'Payroll Update',
    description: 'Update annual payroll to $180,000',
    status: 'Completed',
    requestDate: '2024-02-15',
    effectiveDate: '2024-03-01',
    agent: 'John Doe'
  }
]

function EndorsementTracker() {
  const [expandedEndorsement, setExpandedEndorsement] = useState(null)

  const toggleEndorsement = (id) => {
    setExpandedEndorsement(expandedEndorsement === id ? null : id)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#16a34a'
      case 'In Progress': return '#d97706'
      case 'Pending Underwriting': return '#dc2626'
      case 'Pending Review': return '#6366f1'
      default: return '#64748b'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return '✅'
      case 'In Progress': return '🔄'
      case 'Pending Underwriting': return '⏳'
      case 'Pending Review': return '👀'
      default: return '📋'
    }
  }

  return (
    <section className="endorsement-tracker">
      <div className="tracker-header">
        <h3>Endorsement Tracker</h3>
        <div className="tracker-summary">
          {endorsements.filter(e => e.status !== 'Completed').length} Active Changes
        </div>
      </div>

      <div className="endorsement-list">
        {endorsements.map(endorsement => (
          <div 
            key={endorsement.id} 
            className={`endorsement-card ${expandedEndorsement === endorsement.id ? 'expanded' : ''}`}
          >
            <div 
              className="endorsement-header"
              onClick={() => toggleEndorsement(endorsement.id)}
            >
              <div className="endorsement-main">
                <div className="endorsement-id">{endorsement.id}</div>
                <div className="endorsement-description">{endorsement.description}</div>
                <div 
                  className="endorsement-status"
                  style={{ color: getStatusColor(endorsement.status) }}
                >
                  {getStatusIcon(endorsement.status)} {endorsement.status}
                </div>
              </div>
              <div className="dropdown-arrow">
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none"
                  style={{ 
                    transform: expandedEndorsement === endorsement.id ? 'rotate(180deg)' : 'rotate(0deg)',
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

            {expandedEndorsement === endorsement.id && (
              <div className="endorsement-details">
                <div className="detail-grid">
                  <div className="detail-row">
                    <span className="detail-label">Policy Number:</span>
                    <span className="detail-value">{endorsement.policy}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Type:</span>
                    <span className="detail-value">{endorsement.type}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Request Date:</span>
                    <span className="detail-value">{endorsement.requestDate}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Effective Date:</span>
                    <span className="detail-value">{endorsement.effectiveDate}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Agent:</span>
                    <span className="detail-value">{endorsement.agent}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default EndorsementTracker
