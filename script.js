// Initialize Lucide Icons
lucide.createIcons();

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Menu Toggle ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const menuIcon = mobileMenuBtn.querySelector('i');

  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Toggle icon type between menu and x
    if (navLinks.classList.contains('active')) {
      menuIcon.setAttribute('data-lucide', 'x');
    } else {
      menuIcon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons(); // re-render icon
  });

  // Close mobile menu when clicking a link
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuIcon.setAttribute('data-lucide', 'menu');
      lucide.createIcons();
    });
  });

  // --- Smooth Scrolling for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      
      // Ignore if just "#"
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Offset for fixed header (80px)
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const button = item.querySelector('.faq-question');
    
    button.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(faq => {
        faq.classList.remove('active');
        const answer = faq.querySelector('.faq-answer');
        answer.style.maxHeight = null;
      });

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
        const answer = item.querySelector('.faq-answer');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // --- Scroll Animations (Intersection Observer) ---
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
  });
  
  // --- Header Scroll Effect ---
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = 'var(--shadow-sm)';
      header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
      header.style.boxShadow = 'none';
      header.style.background = 'rgba(255, 255, 255, 0.9)';
    }
  });

});
