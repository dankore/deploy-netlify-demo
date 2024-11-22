const themeToggle = document.getElementById('themeToggle');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

class ThemeManager {
  constructor() {
    this.darkMode = localStorage.getItem('darkMode') === 'true';
    this.init();
  }

  init() {
    this.updateTheme();

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', e => {
        this.darkMode = e.matches;
        this.updateTheme();
      });
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    this.updateTheme();
  }

  updateTheme() {
    if (this.darkMode) {
      body.setAttribute('data-theme', 'dark');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
      body.removeAttribute('data-theme');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    localStorage.setItem('darkMode', this.darkMode);
  }
}

class NavigationManager {
  constructor() {
    this.isOpen = false;
    this.init();
  }

  init() {
    document.addEventListener('click', e => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        this.closeMenu();
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        this.closeMenu();
      }
    });
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');

    const spans = navToggle.querySelectorAll('span');
    if (this.isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  }

  closeMenu() {
    this.isOpen = false;
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
    const spans = navToggle.querySelectorAll('span');
    spans.forEach(span => (span.style.transform = 'none'));
    spans[1].style.opacity = '1';
  }
}

class ScrollAnimationManager {
  constructor() {
    this.init();
  }

  init() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    document
      .querySelectorAll('.culture-card, .gallery-item, .stat-item')
      .forEach(el => {
        el.classList.add('animate-hidden');
        observer.observe(el);
      });
  }
}

class GalleryManager {
  constructor() {
    this.initLightbox();
  }

  initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        this.openLightbox(item.querySelector('img').src);
      });
    });
  }

  openLightbox(imageSrc) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${imageSrc}" alt="Gallery Image">
                <button class="close-lightbox"><i class="fas fa-times"></i></button>
            </div>
        `;

    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';

    lightbox.addEventListener('click', e => {
      if (
        e.target === lightbox ||
        e.target.classList.contains('close-lightbox')
      ) {
        document.body.removeChild(lightbox);
        document.body.style.overflow = '';
      }
    });
  }
}

class FormManager {
  constructor() {
    this.initForm();
  }

  initForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      this.handleSubmit(form);
    });
  }

  async handleSubmit(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    try {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

      await new Promise(resolve => setTimeout(resolve, 1500));

      this.showMessage('Message sent successfully!', 'success');
      form.reset();
    } catch (error) {
      this.showMessage('Failed to send message. Please try again.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }

  showMessage(text, type) {
    const message = document.createElement('div');
    message.className = `form-message ${type}`;
    message.textContent = text;

    const form = document.querySelector('.contact-form');
    form.appendChild(message);

    setTimeout(() => {
      message.remove();
    }, 3000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const themeManager = new ThemeManager();
  const navigationManager = new NavigationManager();
  const scrollAnimationManager = new ScrollAnimationManager();
  const galleryManager = new GalleryManager();
  const formManager = new FormManager();

  themeToggle.addEventListener('click', () => themeManager.toggleTheme());
  navToggle.addEventListener('click', () => navigationManager.toggleMenu());

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
});
