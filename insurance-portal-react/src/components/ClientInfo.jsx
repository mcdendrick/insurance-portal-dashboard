import './ClientInfo.css'

function ClientInfo() {
  return (
    <section className="client-info-section">
      <div className="client-info-card">
        <div className="client-header">
          <h3>ABC Contractors</h3>
        </div>
        
        <div className="client-details">
          <div className="detail-item">
            <span className="detail-label">Contact:</span>
            <span className="detail-value">Michael Johnson, CEO</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Phone:</span>
            <span className="detail-value">
              <a href="tel:+13104567890">(310) 456-7890</a>
            </span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Email:</span>
            <span className="detail-value">
              <a href="mailto:michael.johnson@abccontractors.com">
                michael.johnson@abccontractors.com
              </a>
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Address:</span>
            <span className="detail-value">
              1234 Business Blvd<br />
              Los Angeles, CA 90210
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ClientInfo
