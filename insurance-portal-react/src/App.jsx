import { useState } from 'react'
import Header from './components/Header'
import ClientInfo from './components/ClientInfo'
import PolicySection from './components/PolicySection'
import BillingSection from './components/BillingSection'
import AgentSection from './components/AgentSection'
import EndorsementTracker from './components/EndorsementTracker'
import CompanyLogo from './components/CompanyLogo'
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  return (
    <div className="App">
      <Header onSearch={handleSearch} />
      <main className="main">
        <div className="main-content">
          <PolicySection searchQuery={searchQuery} />
          <EndorsementTracker />
        </div>
        <div className="sidebar">
          <BillingSection />
          <AgentSection />
          <ClientInfo />
        </div>
      </main>
      <CompanyLogo />
    </div>
  )
}

export default App
