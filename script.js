// The archive is an enhancement of native <details>; every photo works without JS.
const archiveCards = [...document.querySelectorAll('.archive-grid .photograph')];
const filters = document.querySelector('.filters');
const archiveCount = document.querySelector('.archive-count');
filters.hidden = false;
filters.addEventListener('click', event => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  const category = button.dataset.filter;
  archiveCards.forEach(card => {
    card.hidden = category !== 'all' && card.dataset.category !== category;
  });
  filters.querySelectorAll('button').forEach(item => {
    item.setAttribute('aria-pressed', String(item === button));
  });
  archiveCount.textContent = `${archiveCards.filter(card => !card.hidden).length} photographs`;
});
document.querySelector('#year').textContent = new Date().getFullYear();

// Add a small entrance only when motion is welcome. Stop observing after reveal.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06 });
  document.querySelectorAll('.selection-grid .photograph').forEach(element => {
    element.classList.add('reveal');
    observer.observe(element);
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) {
      document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible'));
      observer.disconnect();
    }
  });
}

const dialog = document.querySelector('.lightbox');
const viewerImage = dialog.querySelector('.viewer-image');
const viewerLabel = dialog.querySelector('.viewer-label');
const viewerCounter = dialog.querySelector('.viewer-counter');
let activeLinks = [];
let activeIndex = 0;
let trigger = null;
let touchStart = null;

function showPhoto() {
  const link = activeLinks[activeIndex];
  viewerImage.src = link.getAttribute('href');
  viewerImage.alt = link.querySelector('img').alt;
  viewerLabel.textContent = viewerImage.alt;
  viewerCounter.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(activeLinks.length).padStart(2, '0')}`;
}
function step(direction) {
  activeIndex = (activeIndex + direction + activeLinks.length) % activeLinks.length;
  showPhoto();
}
if (typeof dialog.showModal === 'function') {
  document.addEventListener('click', event => {
    const link = event.target.closest('[data-photo]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    trigger = link;
    activeLinks = link.dataset.set === 'archive'
      ? archiveCards.filter(card => !card.hidden).map(card => card.querySelector('a'))
      : [...document.querySelectorAll('[data-set="selection"]')];
    // The cover photograph belongs to the selected collection too.
    activeIndex = activeLinks.findIndex(item => item.getAttribute('href') === link.getAttribute('href'));
    if (activeIndex < 0) activeIndex = 0;
    showPhoto();
    dialog.showModal();
    document.body.classList.add('viewer-open');
  });
  dialog.querySelector('.viewer-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.viewer-prev').addEventListener('click', () => step(-1));
  dialog.querySelector('.viewer-next').addEventListener('click', () => step(1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      step(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  viewerImage.addEventListener('touchstart', event => {
    touchStart = event.touches.length === 1
      ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
      : null;
  }, { passive: true });
  viewerImage.addEventListener('touchend', event => {
    if (!touchStart || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
    touchStart = null;
  }, { passive: true });
  viewerImage.addEventListener('touchcancel', () => { touchStart = null; }, { passive: true });
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('viewer-open');
    touchStart = null;
    trigger?.focus({ preventScroll: true });
    viewerImage.removeAttribute('src');
  });
}
