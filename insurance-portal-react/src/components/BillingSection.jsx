import { useState } from 'react'
import './BillingSection.css'

function BillingSection() {
  const [showPaymentHistory, setShowPaymentHistory] = useState(false)

  const paymentHistory = [
    { date: 'Feb 15, 2024', amount: '$1,200.00', status: 'Paid', method: 'Auto-Pay' },
    { date: 'Jan 15, 2024', amount: '$1,200.00', status: 'Paid', method: 'Credit Card' },
    { date: 'Dec 15, 2023', amount: '$1,200.00', status: 'Paid', method: 'Auto-Pay' },
    { date: 'Nov 15, 2023', amount: '$1,200.00', status: 'Paid', method: 'Bank Transfer' }
  ]

  return (
    <section className="billing-section">
      <h3>Billing & Payments</h3>
      
      {/* Due Now */}
      <div className="billing-item due-now">
        <div className="billing-details">
          <div className="billing-icon due-icon">⚠️</div>
          <div className="billing-info">
            <div className="billing-amount due">$450.00</div>
            <div className="billing-desc">Due March 15, 2024</div>
          </div>
        </div>
        <div className="due-marker">DUE NOW</div>
      </div>

      {/* Pay Now Button */}
      <div className="payment-actions">
        <a 
          href="https://usnci.epaypolicy.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="pay-now-btn"
        >
          💳 Pay Now
        </a>
      </div>

      {/* Payment History Dropdown */}
      <div className="payment-history">
        <button 
          className="history-toggle"
          onClick={() => setShowPaymentHistory(!showPaymentHistory)}
        >
          <span>Payment History</span>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none"
            style={{ 
              transform: showPaymentHistory ? 'rotate(180deg)' : 'rotate(0deg)',
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
        </button>
        
        {showPaymentHistory && (
          <div className="history-content">
            {paymentHistory.map((payment, index) => (
              <div key={index} className="history-item">
                <div className="history-date">{payment.date}</div>
                <div className="history-amount">{payment.amount}</div>
                <div className="history-status">{payment.status}</div>
                <div className="history-method">{payment.method}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default BillingSection