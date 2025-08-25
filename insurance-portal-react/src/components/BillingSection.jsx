import './BillingSection.css'

function BillingSection() {
  return (
    <section className="billing-section">
      <h3>Billing Information</h3>
      <div className="billing-item">
        <div className="billing-amount">$450.00</div>
        <div className="billing-desc">Due March 15, 2024</div>
      </div>
      <div className="billing-item">
        <div className="billing-amount">$1,200.00</div>
        <div className="billing-desc">Paid February 15, 2024</div>
      </div>
    </section>
  )
}

export default BillingSection