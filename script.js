const BUSINESS_EMAIL = 'statverse45@gmail.com';
const THEME_KEY = 'statverse-theme';

const root = document.documentElement;
const themeToggle = document.querySelector('#theme-toggle');

function applyTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
  if (themeToggle) {
    const isLight = theme === 'light';
    themeToggle.setAttribute('aria-pressed', String(isLight));
    themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
  }
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) metaTheme.setAttribute('content', theme === 'light' ? '#f5f7f3' : '#050605');
}

const savedTheme = localStorage.getItem(THEME_KEY);
applyTheme(savedTheme === 'light' ? 'light' : 'dark');

themeToggle?.addEventListener('click', () => {
  applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
});

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
}, { threshold: 0.10 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navLinks?.classList.contains('open')) {
    navLinks.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
});

const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
const copyButton = document.querySelector('#copy-enquiry');

function buildEnquiry() {
  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const whatsapp = String(data.get('whatsapp') || '').trim();
  const brand = String(data.get('brand') || '').trim();
  const type = String(data.get('type') || '').trim();
  const requirements = String(data.get('requirements') || '').trim();

  const subject = `New StatVerse enquiry — ${brand || type || 'Website project'}`;
  const lines = [
    'Hello StatVerse Studios,',
    '',
    `Name: ${name || 'Not provided'}`,
    `Email: ${email || 'Not provided'}`,
    `WhatsApp: ${whatsapp || 'Not provided'}`,
    `Business / Brand: ${brand || 'Not provided'}`,
    `Website Type: ${type || 'Not provided'}`,
    '',
    'Project Requirements:',
    requirements || 'Not provided',
    '',
    'Sent from the StatVerse Studios website.'
  ];
  return { subject, body: lines.join('\n') };
}

function encodeGmailUrl(subject, body) {
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: BUSINESS_EMAIL,
    su: subject,
    body
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

function encodeMailtoUrl(subject, body) {
  return `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

if (form && status) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const { subject, body } = buildEnquiry();
    const gmailUrl = encodeGmailUrl(subject, body);
    const mailtoUrl = encodeMailtoUrl(subject, body);

    // First try browser-based Gmail compose so the experience works even when
    // the visitor has no desktop mail application configured.
    const popup = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    if (!popup) {
      window.location.href = mailtoUrl;
      status.textContent = 'Gmail was blocked by the browser, so your default email app is opening instead.';
    } else {
      status.textContent = `Gmail compose opened for ${BUSINESS_EMAIL}. Review it and press Send.`;
    }
  });
}

copyButton?.addEventListener('click', async () => {
  if (!form || !status) return;
  if (!form.reportValidity()) return;
  const { subject, body } = buildEnquiry();
  const text = `To: ${BUSINESS_EMAIL}\nSubject: ${subject}\n\n${body}`;

  try {
    await navigator.clipboard.writeText(text);
    status.textContent = 'Enquiry copied. You can paste it into any email or WhatsApp chat.';
  } catch {
    status.textContent = 'Copy was blocked by the browser. Select and copy the form details manually.';
  }
});
