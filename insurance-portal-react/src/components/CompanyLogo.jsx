import logoImage from '../assets/new-century-logo.png'
import './CompanyLogo.css'

function CompanyLogo() {
  return (
    <div className="company-logo">
      <img src={logoImage} alt="New Century Insurance Services" />
    </div>
  )
}

export default CompanyLogo