/* ============================================
   SkillBridge Academy — JavaScript
   DecodeLabs Project 1: Responsive Frontend
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------
     1. Mobile Navigation Menu
     ------------------------------------------ */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  /** Toggle the mobile menu open/closed */
  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open');
    mobileOverlay.classList.toggle('open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  }

  hamburger.addEventListener('click', toggleMobileMenu);
  mobileOverlay.addEventListener('click', toggleMobileMenu);

  // Close mobile menu when a link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('open')) {
        toggleMobileMenu();
      }
    });
  });

  /* ------------------------------------------
     2. Header Scroll Effect
     ------------------------------------------ */
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  /* ------------------------------------------
     3. Smooth Scroll for Anchor Links
     ------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ------------------------------------------
     4. FAQ Accordion
     ------------------------------------------ */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const answerInner = item.querySelector('.faq-answer-inner');

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other FAQ items
      faqItems.forEach(other => {
        if (other !== item && other.classList.contains('open')) {
          other.classList.remove('open');
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-answer').style.maxHeight = '0';
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove('open');
        questionBtn.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = '0';
      } else {
        item.classList.add('open');
        questionBtn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answerInner.scrollHeight + 'px';
      }
    });
  });

  /* ------------------------------------------
     5. Interactive Demo — Learning Goal Selector
     ------------------------------------------ */
  const demoOptions = document.querySelectorAll('.demo-option');
  const demoResult = document.getElementById('demo-result');

  // Recommendation data for each learning goal
  const recommendations = {
    frontend: {
      icon: '🏗️',
      title: 'Frontend Basics Path',
      description: 'Start with the foundations of the web. You will learn how to structure pages with semantic HTML, style them with modern CSS, and understand how browsers render content.',
      topics: ['HTML5 Semantics', 'CSS Box Model', 'Flexbox & Grid', 'Forms & Inputs', 'Browser DevTools']
    },
    responsive: {
      icon: '📱',
      title: 'Responsive Design Path',
      description: 'Master the art of building layouts that look great on any screen. Learn mobile-first CSS, media queries, fluid typography, and responsive images.',
      topics: ['Media Queries', 'Mobile-First CSS', 'Fluid Layouts', 'Responsive Images', 'Viewport Units']
    },
    javascript: {
      icon: '⚡',
      title: 'JavaScript Practice Path',
      description: 'Bring your pages to life with interactivity. Learn DOM manipulation, event handling, form validation, and how to build dynamic user interfaces.',
      topics: ['DOM Manipulation', 'Event Listeners', 'Form Validation', 'ES6+ Features', 'API Basics']
    }
  };

  demoOptions.forEach(option => {
    option.addEventListener('click', () => {
      // Update active state
      demoOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');

      // Get recommendation data
      const goal = option.dataset.goal;
      const data = recommendations[goal];

      // Build the result HTML
      const topicTags = data.topics
        .map(topic => `<span class="demo-tag">${topic}</span>`)
        .join('');

      demoResult.innerHTML = `
        <div class="demo-result-icon">${data.icon}</div>
        <h3>${data.title}</h3>
        <p>${data.description}</p>
        <div class="demo-result-topics">${topicTags}</div>
      `;

      // Subtle entrance animation
      demoResult.style.opacity = '0';
      demoResult.style.transform = 'translateY(8px)';
      requestAnimationFrame(() => {
        demoResult.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        demoResult.style.opacity = '1';
        demoResult.style.transform = 'translateY(0)';
      });
    });
  });

  // Select the first option by default
  if (demoOptions.length > 0) {
    demoOptions[0].click();
  }

  /* ------------------------------------------
     6. Contact Form Validation
     ------------------------------------------ */
  const form = document.getElementById('contact-form');
  const successMessage = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Clear previous errors
      form.querySelectorAll('.form-error').forEach(el => el.classList.remove('visible'));
      form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(el => {
        el.classList.remove('error');
      });

      // Validate Name (required)
      const name = form.querySelector('#name');
      if (!name.value.trim()) {
        showError(name, 'name-error', 'Please enter your name.');
        isValid = false;
      }

      // Validate Email (required + format)
      const email = form.querySelector('#email');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim()) {
        showError(email, 'email-error', 'Please enter your email address.');
        isValid = false;
      } else if (!emailPattern.test(email.value.trim())) {
        showError(email, 'email-error', 'Please enter a valid email address.');
        isValid = false;
      }

      // Validate Interest (required)
      const interest = form.querySelector('#interest');
      if (!interest.value) {
        showError(interest, 'interest-error', 'Please select a learning interest.');
        isValid = false;
      }

      // Validate Message (minimum 10 characters)
      const message = form.querySelector('#message');
      if (!message.value.trim()) {
        showError(message, 'message-error', 'Please enter a message.');
        isValid = false;
      } else if (message.value.trim().length < 10) {
        showError(message, 'message-error', 'Message must be at least 10 characters long.');
        isValid = false;
      }

      // If valid, show success
      if (isValid) {
        form.style.display = 'none';
        successMessage.classList.add('visible');

        // Reset form after a delay (so user can submit again if needed)
        setTimeout(() => {
          form.reset();
          form.style.display = 'block';
          successMessage.classList.remove('visible');
        }, 5000);
      }
    });

    // Real-time error clearing on input
    form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('error');
        const errorEl = input.parentElement.querySelector('.form-error');
        if (errorEl) errorEl.classList.remove('visible');
      });
    });
  }

  /**
   * Show a validation error for a form field
   * @param {HTMLElement} field — the input element
   * @param {string} errorId — the ID of the error message element
   * @param {string} message — the error message to display
   */
  function showError(field, errorId, message) {
    field.classList.add('error');
    const errorEl = document.getElementById(errorId);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('visible');
    }
  }

  /* ------------------------------------------
     7. Scroll Reveal Animations
     ------------------------------------------ */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: show all immediately
    revealElements.forEach(el => el.classList.add('visible'));
  }

  /* ------------------------------------------
     8. Active Nav Link Highlighting
     ------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navAnchors.forEach(anchor => {
      anchor.classList.remove('active');
      if (anchor.getAttribute('href') === `#${current}`) {
        anchor.classList.add('active');
      }
    });
  }, { passive: true });

});
