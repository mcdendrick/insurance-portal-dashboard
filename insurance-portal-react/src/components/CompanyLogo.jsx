import logoImage from '../assets/new-century-logo.png'
import './CompanyLogo.css'

function CompanyLogo() {
  return (
    <div className="company-logo">
      <a 
        href="https://www.usnci.com/" 
        target="_blank" 
        rel="noopener noreferrer"
        title="Visit New Century Insurance"
      >
        <img 
          src={logoImage} 
          alt="New Century Insurance Services"
          onError={(e) => {
            console.log('Logo failed to load:', e.target.src);
            e.target.style.display = 'none';
          }}
        />
      </a>
    </div>
  )
}

export default CompanyLogo