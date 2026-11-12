document.querySelector('#year').textContent = new Date().getFullYear();

// Justified rows use the supplied dimensions, so lazy-loaded photos reserve
// their exact space. No cropping or image-load measurement is necessary.
const gallery = document.querySelector('.gallery-grid');
if (gallery) {
  const cards = [...gallery.querySelectorAll('.photograph')];
  const ratios = cards.map(card => {
    const image = card.querySelector('img');
    return Number(image.getAttribute('width')) / Number(image.getAttribute('height'));
  });
  let previousWidth = 0;
  let layoutFrame = 0;
  function layoutGallery() {
    const width = gallery.clientWidth;
    if (!width || width === previousWidth) return;
    previousWidth = width;
    const gap = parseFloat(getComputedStyle(gallery).columnGap) || 10;
    const target = width < 600 ? width / 2.1 : width < 1000 ? 250 : 300;
    let start = 0;
    while (start < cards.length) {
      let end = start;
      let sum = 0;
      // Choose the next row whose common height is closest to the target.
      while (end < cards.length) {
        sum += ratios[end++];
        const height = (width - gap * (end - start - 1)) / sum;
        if (height <= target) {
          if (end - start > 1) {
            const priorHeight = (width - gap * (end - start - 2)) / (sum - ratios[end - 1]);
            if (Math.abs(priorHeight - target) < Math.abs(height - target)) {
              sum -= ratios[--end];
            }
          }
          break;
        }
      }
      const available = width - gap * (end - start - 1);
      const height = Math.min(available / sum, end === cards.length ? target : Infinity);
      for (let i = start; i < end; i++) {
        // Round down slightly to prevent fractional pixels wrapping the last item.
        cards[i].style.width = `${Math.floor(height * ratios[i] * 100) / 100}px`;
        cards[i].style.height = `${height}px`;
        cards[i].querySelector('img').sizes = `${Math.ceil(height * ratios[i])}px`;
      }
      start = end;
    }
    gallery.classList.add('rows-ready');
  }
  layoutGallery();
  const scheduleLayout = () => {
    cancelAnimationFrame(layoutFrame);
    layoutFrame = requestAnimationFrame(layoutGallery);
  };
  if ('ResizeObserver' in window) new ResizeObserver(scheduleLayout).observe(gallery);
  else window.addEventListener('resize', scheduleLayout);
}

const dialog = document.querySelector('.lightbox');
const viewerImage = dialog?.querySelector('.viewer-image');
const viewerLabel = dialog?.querySelector('.viewer-label');
const viewerCounter = dialog?.querySelector('.viewer-counter');
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
if (dialog && typeof dialog.showModal === 'function') {
  document.addEventListener('click', event => {
    const link = event.target.closest('[data-photo]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    trigger = link;
    // One complete gallery sequence, even when opened from a featured image.
    activeLinks = [...document.querySelectorAll('.gallery-grid [data-photo]')];
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
