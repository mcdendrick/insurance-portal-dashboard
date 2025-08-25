import { useState } from 'react'
import Header from './components/Header'
import PolicySection from './components/PolicySection'
import BillingSection from './components/BillingSection'
import AgentSection from './components/AgentSection'
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
        <PolicySection searchQuery={searchQuery} />
        <div className="sidebar">
          <BillingSection />
          <AgentSection />
        </div>
      </main>
      <CompanyLogo />
    </div>
  )
}

export default App
