import logoImage from '../assets/new-century-logo.png'
import './CompanyLogo.css'

function CompanyLogo() {
  return (
    <div className="company-logo">
      <img 
        src={logoImage} 
        alt="New Century Insurance Services"
        onError={(e) => {
          console.log('Logo failed to load:', e.target.src);
          e.target.style.display = 'none';
        }}
      />
    </div>
  )
}

export default CompanyLogo