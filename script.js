const BUSINESS_EMAIL = 'statversestudios@gmail.com';

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
if (form && status) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const whatsapp = String(data.get('whatsapp') || '').trim();
    const brand = String(data.get('brand') || '').trim();
    const type = String(data.get('type') || '').trim();
    const requirements = String(data.get('requirements') || '').trim();

    const subject = encodeURIComponent(`New StatVerse enquiry — ${brand || type || 'Website project'}`);
    const body = encodeURIComponent([
      `Name: ${name}`,
      `Email: ${email}`,
      `WhatsApp: ${whatsapp || 'Not provided'}`,
      `Business / Brand: ${brand || 'Not provided'}`,
      `Website Type: ${type || 'Not provided'}`,
      '',
      'Project Requirements:',
      requirements || 'Not provided'
    ].join('\n'));

    status.textContent = 'Opening your email app with the enquiry details…';
    window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`;
  });
}
