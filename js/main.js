/* ============================================================
   PORTFOLIO — main.js
============================================================ */

/* ── CUSTOM CURSOR ───────────────────────────────────────── */
const cursor = document.getElementById('cursor');
if (window.matchMedia('(pointer:fine)').matches) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, .project-card, .gallery-item, .skill-tag').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
  });
}

/* ── MOBILE NAV DROPDOWN ─────────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function openMenu()  { mobileMenu.classList.add('open');    hamburger.classList.add('open'); }
function closeMenu() { mobileMenu.classList.remove('open'); hamburger.classList.remove('open'); }

hamburger.addEventListener('click', e => {
  e.stopPropagation();
  mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
});

document.querySelectorAll('.mob-link').forEach(a => a.addEventListener('click', closeMenu));

document.addEventListener('click', e => {
  if (mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)) closeMenu();
});

/* ── SCROLL REVEAL ───────────────────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── GALLERY DRAG-TO-SCROLL ──────────────────────────────── */
const track = document.getElementById('galleryTrack');
if (track) {
  let isDown = false, startX, scrollLeft;
  track.addEventListener('mousedown', e => {
    isDown = true;
    track.style.cursor = 'grabbing';
    const rect = track.getBoundingClientRect();
    startX = e.clientX - rect.left;
    scrollLeft = track.scrollLeft;
  });
  track.addEventListener('mouseleave', () => { isDown = false; track.style.cursor = 'grab'; });
  document.addEventListener('mouseup',    () => { if (!isDown) return; isDown = false; track.style.cursor = 'grab'; });
  track.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const rect = track.getBoundingClientRect();
    const x = e.clientX - rect.left;
    track.scrollLeft = scrollLeft - (x - startX) * 1.4;
  });
  track.addEventListener('dragstart', e => e.preventDefault());
}

/* ── CONTACT FORM ────────────────────────────────────────── */
const sendBtn = document.getElementById('sendBtn');
if (sendBtn) {
  sendBtn.addEventListener('click', function () {
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      this.textContent = 'Fill in the fields ✦';
      this.style.background = 'var(--mauve)';
      this.style.color = 'var(--ink)';
      setTimeout(() => {
        this.textContent = 'Send Message ✦';
        this.style.background = '';
        this.style.color = '';
      }, 2000);
      return;
    }

    // CONFIG: Swap in your Formspree ID or EmailJS call here
    // Example: fetch('https://formspree.io/f/YOUR_FORM_ID', { method:'POST', body: new FormData(form) })

    this.textContent = 'Sent! Talk soon ✦';
    this.style.background = 'var(--olive)';
    this.style.color = 'var(--ink)';

    setTimeout(() => {
      this.textContent = 'Send Message ✦';
      this.style.background = '';
      this.style.color = '';
      ['name', 'email', 'subject', 'message'].forEach(id => {
        document.getElementById(id).value = '';
      });
    }, 3000);
  });
}

/* ── NAV SHADOW ON SCROLL ────────────────────────────────── */
window.addEventListener('scroll', () => {
  document.querySelector('nav').style.boxShadow =
    window.scrollY > 20 ? '0 4px 24px rgba(0,0,0,.2)' : 'none';
});
