import './AgentSection.css'

function AgentSection() {
  const handleScheduleCall = () => {
    alert('Schedule call feature coming soon! Please call (123) 456-7890 to speak with John Doe.')
  }

  return (
    <section className="agent-section">
      <div className="agent-card">
        <div className="agent-photo">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" 
            alt="John Doe"
          />
        </div>
        <div className="agent-info">
          <h3>John Doe</h3>
          <p>Agent</p>
          <div className="phone-number">📞 (123) 456-7890</div>
        </div>
        <button className="schedule-call-btn" onClick={handleScheduleCall}>
          Schedule Call
        </button>
      </div>
    </section>
  )
}

export default AgentSection