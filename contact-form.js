// Keep submissions on the Contact page; native form POST remains the no-JS fallback.
const contactForm = document.getElementById('form');
if (contactForm) {
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const fields = contactForm.querySelector('fieldset');
  const status = document.getElementById('form-status');
  let sending = false;

  contactForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || !contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const originalText = submitBtn.textContent;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    sending = true;
    status.textContent = '';
    status.removeAttribute('data-state');
    contactForm.setAttribute('aria-busy', 'true');
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;
    fields.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
        signal: controller.signal
      });
      const data = await response.json();
      if (response.ok && data.success === true) {
        status.textContent = 'Thank you! Your message has been sent.';
        status.dataset.state = 'success';
        contactForm.reset();
      } else {
        status.textContent = typeof data.message === 'string' && data.message.trim()
          ? `Your message wasn’t sent. ${data.message} Please try again, or call or email Keith.`
          : 'Your message wasn’t sent. Please try again, or call or email Keith.';
        status.dataset.state = 'error';
      }
    } catch (error) {
      status.textContent = 'We couldn’t confirm your message was sent. Please try again, or call or email Keith.';
      status.dataset.state = 'error';
    } finally {
      clearTimeout(timeout);
      sending = false;
      fields.disabled = false;
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      contactForm.removeAttribute('aria-busy');
      status.focus({ preventScroll: true });
      status.scrollIntoView({ block: 'nearest', behavior: 'instant' });
    }
  });
}
