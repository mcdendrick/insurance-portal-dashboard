// DOM elements
const policyCards = document.querySelectorAll('.policy-card');

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add click listeners to policy headers for dropdown functionality
    policyCards.forEach(card => {
        const header = card.querySelector('.policy-header');
        header.addEventListener('click', function() {
            togglePolicyDropdown(card);
        });
    });

    // Schedule call button
    const scheduleBtn = document.querySelector('.schedule-call-btn');
    scheduleBtn.addEventListener('click', function() {
        alert('Schedule call feature coming soon! Please call (123) 456-7890 to speak with John Doe.');
    });

    // Add hover effects to policy cards
    policyCards.forEach(card => {
        const header = card.querySelector('.policy-header');
        header.addEventListener('mouseenter', function() {
            if (!card.classList.contains('expanded')) {
                card.style.transform = 'translateY(-2px)';
                card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
            }
        });

        header.addEventListener('mouseleave', function() {
            if (!card.classList.contains('expanded')) {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }
        });
    });
});

// Functions
function togglePolicyDropdown(card) {
    const isExpanded = card.classList.contains('expanded');
    
    // Close all other dropdowns
    policyCards.forEach(otherCard => {
        if (otherCard !== card && otherCard.classList.contains('expanded')) {
            otherCard.classList.remove('expanded');
            otherCard.style.transform = 'translateY(0)';
            otherCard.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Toggle current dropdown
    if (isExpanded) {
        card.classList.remove('expanded');
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    } else {
        card.classList.add('expanded');
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
    }
}

// Add some interactive features
function addInteractiveFeatures() {
    // Animate policy cards on load
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    });

    // Initially hide cards for animation
    policyCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize interactive features
addInteractiveFeatures();

// Add click animation to policy headers
policyCards.forEach(card => {
    const header = card.querySelector('.policy-header');
    header.addEventListener('click', function() {
        // Add a subtle click animation to the dropdown arrow
        const arrow = header.querySelector('.dropdown-arrow');
        arrow.style.transform = 'scale(0.9)';
        setTimeout(() => {
            arrow.style.transform = card.classList.contains('expanded') ? 'rotate(180deg)' : 'rotate(0deg)';
        }, 100);
    });
});

// Simulate real-time updates (optional feature)
function simulateRealTimeUpdates() {
    // This could be connected to a real backend in the future
    setInterval(() => {
        // Example: Update billing information or policy status
        // This is just a placeholder for future real-time features
    }, 30000); // Check every 30 seconds
}

// Initialize real-time updates
simulateRealTimeUpdates();
