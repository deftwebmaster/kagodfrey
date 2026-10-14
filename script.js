const cards = [...document.querySelectorAll('.photo')];
const filters = document.querySelector('.filters');
const moreButton = document.querySelector('.more-button');
const count = document.querySelector('.gallery-count');
let category = 'all';
let expanded = false;
function updateGallery() {
  const matching = cards.filter(card => category === 'all' || card.dataset.category === category);
  const shown = expanded ? matching : matching.slice(0, 12);
  cards.forEach(card => { card.hidden = !shown.includes(card); });
  count.textContent = `${shown.length} / ${matching.length} photographs`;
  moreButton.hidden = matching.length <= shown.length;
}
filters.hidden = false;
filters.addEventListener('click', event => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  category = button.dataset.filter;
  expanded = false;
  filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  updateGallery();
});
moreButton.addEventListener('click', () => {
  const previousCount = cards.filter(card => !card.hidden).length;
  expanded = true;
  updateGallery();
  const visible = cards.filter(card => !card.hidden);
  visible[previousCount]?.querySelector('a').focus({ preventScroll: true });
});
updateGallery();
document.querySelector('#year').textContent = new Date().getFullYear();
const dialog = document.querySelector('.lightbox');
const viewerImage = dialog.querySelector('img');
const viewerLabel = dialog.querySelector('.lightbox-label');
const viewerCounter = dialog.querySelector('.lightbox-counter');
let activeLinks = [];
let activeIndex = 0;
let trigger = null;
function showPhoto() {
  const link = activeLinks[activeIndex];
  const source = link.querySelector('img');
  viewerImage.src = link.getAttribute('href');
  viewerImage.alt = source.alt;
  viewerLabel.textContent = source.alt;
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
    activeLinks = link.closest('.gallery')
      ? cards.filter(card => !card.hidden).map(card => card.querySelector('a'))
      : [...document.querySelectorAll('.intro [data-photo]')];
    activeIndex = activeLinks.indexOf(link);
    showPhoto();
    dialog.showModal();
    document.body.classList.add('viewer-open');
  });
  dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.lightbox-prev').addEventListener('click', () => step(-1));
  dialog.querySelector('.lightbox-next').addEventListener('click', () => step(1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      step(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('viewer-open');
    trigger?.focus({ preventScroll: true });
    viewerImage.removeAttribute('src');
  });
}
