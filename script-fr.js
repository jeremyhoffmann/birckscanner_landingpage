// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const appScreenshot = document.getElementById('appScreenshot');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for navigation
  setupSmoothScrolling();
  
  // Navbar scroll effect
  setupNavbarScrollEffect();
  
  // Intersection Observer for animations
  setupScrollAnimations();
  
  // Set up app screenshot placeholder
  setupAppScreenshot();
  
  // Set up avatar placeholders
  setupAvatarPlaceholders();
});

// Mobile menu toggle
hamburger.addEventListener('click', function() {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-menu a, .nav-menu button').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  });
});


// Smooth scrolling
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Navbar scroll effect
function setupNavbarScrollEffect() {
  const navbar = document.querySelector('.navbar');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.backdropFilter = 'blur(10px)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.backdropFilter = 'blur(10px)';
      navbar.style.boxShadow = 'none';
    }
    
    // Hide/show navbar on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
  });
}

// Scroll animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    '.step, .feature, .testimonial, .hero-content, .section-title'
  );
  
  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

// App screenshot setup
function setupAppScreenshot() {
  // Create a gradient placeholder for the app screenshot
  const canvas = document.createElement('canvas');
  canvas.width = 240;
  canvas.height = 520;
  const ctx = canvas.getContext('2d');
  
  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, 0, 520);
  gradient.addColorStop(0, '#dc2626');
  gradient.addColorStop(1, '#ef4444');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 240, 520);
  
  // Add some UI elements
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.fillRect(20, 80, 200, 60);
  ctx.fillRect(20, 160, 200, 120);
  ctx.fillRect(20, 300, 90, 90);
  ctx.fillRect(130, 300, 90, 90);
  
  // Add LEGO brick icons
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.font = '24px sans-serif';
  ctx.fillText('🟥', 40, 340);
  ctx.fillText('🟦', 150, 340);
  ctx.fillText('🟨', 40, 370);
  ctx.fillText('🟩', 150, 370);
  
  // Add French text
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('Scanner LEGO', 60, 110);
  ctx.font = '12px sans-serif';
  ctx.fillText('Prendre une photo', 40, 200);
  ctx.fillText('Analyser les pièces', 40, 220);
  
  // Convert to data URL and set as src
  appScreenshot.src = canvas.toDataURL();
  appScreenshot.alt = 'Interface de l\'application Brick Scanner';
}

// Avatar placeholders setup
function setupAvatarPlaceholders() {
  const avatars = document.querySelectorAll('.testimonial-author img');
  avatars.forEach((avatar, index) => {
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    
    // Create circular avatar with initials
    const colors = ['#dc2626', '#b91c1c', '#f87171'];
    const initials = [['M', 'L'], ['T', 'B'], ['S', 'M']];
    
    ctx.fillStyle = colors[index];
    ctx.beginPath();
    ctx.arc(50, 50, 50, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 32px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initials[index].join(''), 50, 50);
    
    avatar.src = canvas.toDataURL();
  });
}

// Download button functionality
document.querySelectorAll('.download-btn-hero, .download-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    // Add ripple effect
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    this.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);

    // Allow normal navigation to occur
    // No preventDefault() call, so the link will work normally
  });
});

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);


// Parallax effect for floating bricks
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelectorAll('.floating-brick');
  const speed = 0.5;

  parallax.forEach((element, index) => {
    const yPos = -(scrolled * speed * (index + 1) * 0.1);
    element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
  });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounced scroll handlers
const debouncedScroll = debounce(() => {
  // Any heavy scroll calculations can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Error handling for images
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    this.style.display = 'none';
  });
});

// Add loading states
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});