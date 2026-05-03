// =============================================
// Theme Toggle
// =============================================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
  const theme = html.getAttribute('data-theme');
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// =============================================
// Mobile Menu Toggle
// =============================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// =============================================
// Speed Test Simulation
// =============================================
const speedTestBtn = document.getElementById('speedTestBtn');
const speedResult  = document.getElementById('speedResult');

speedTestBtn.addEventListener('click', () => {
  speedTestBtn.disabled = true;
  speedTestBtn.textContent = 'Testing…';
  speedResult.textContent = '';
  speedResult.classList.remove('show');

  // Simulate a progress ticker
  const stages = [
    { msg: 'Connecting to nearest server…', delay: 600 },
    { msg: 'Measuring download speed…',    delay: 1400 },
    { msg: 'Measuring upload speed…',      delay: 1200 },
  ];

  let elapsed = 0;
  stages.forEach(s => {
    setTimeout(() => { speedResult.textContent = s.msg; }, elapsed);
    elapsed += s.delay;
  });

  setTimeout(() => {
    const download = (Math.random() * 800 + 200).toFixed(1);
    const upload   = (Math.random() * 400 + 100).toFixed(1);
    const ping     = Math.floor(Math.random() * 12 + 3);

    speedResult.innerHTML = `
      ⬇ <strong>${download} Mbps</strong> download &nbsp;|&nbsp;
      ⬆ <strong>${upload} Mbps</strong> upload &nbsp;|&nbsp;
      Ping <strong>${ping} ms</strong>
    `;
    speedResult.classList.add('show');
    speedTestBtn.disabled = false;
    speedTestBtn.textContent = 'Run Speed Test';
  }, elapsed + 400);
});

// =============================================
// Scroll Reveal
// =============================================
const revealEls = document.querySelectorAll(
  '.card, .pricing-card, .hero-content, .hero-graphic, .section-header, .speedtest-card'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// =============================================
// Active Nav Link Highlight on Scroll
// =============================================
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === '#' + entry.target.id) {
          a.style.color = '#e6eaf3';
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

document.querySelector("button").addEventListener("click", () => {
  alert("Message sent! (connect backend later)");
});
