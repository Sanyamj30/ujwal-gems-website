/**
 * js/lightbox.js — Certification Vault lightbox module
 *
 * Responsibilities:
 *  - initLightbox(): inject lightbox HTML into <body> on first call
 *  - openLightbox(cert): display full-resolution certificate image in overlay
 *  - closeLightbox(): hide overlay and restore scroll/focus
 *  - clampScale(scale): clamp zoom scale to [1.0, 4.0]
 *  - applyZoom(state, direction): increment/decrement scale by 0.25
 *  - resetPan(state): reset panX and panY to 0
 *  - Keyboard: Escape closes lightbox
 *  - Mouse: click-and-drag panning when zoomed
 *  - Touch: pinch-to-zoom and swipe-to-pan
 */

/**
 * Internal lightbox state object.
 * Maintained as a module-level singleton.
 */
const state = {
  isOpen: false,
  currentCertId: null,
  scale: 1.0,
  panX: 0,
  panY: 0,
  isDragging: false,
  dragStartX: 0,
  dragStartY: 0,
  lastPinchDistance: null,
  triggerElement: null, // the card that opened the lightbox (for focus return)
};

/**
 * Maps a certifier key to its display label.
 * @param {string} certifier
 * @returns {string}
 */
function certifierLabel(certifier) {
  const labels = { gia: 'GIA', igi: 'IGI', 'jaipur-lab': 'Jaipur Lab' };
  return labels[certifier] || certifier;
}

/**
 * Clamps a zoom scale value to the valid range [1.0, 4.0].
 * @param {number} scale
 * @returns {number}
 */
export function clampScale(scale) {
  return Math.min(4.0, Math.max(1.0, scale));
}

/**
 * Applies a zoom step to the lightbox state.
 * @param {{ scale: number, panX: number, panY: number }} state
 * @param {'in' | 'out'} direction
 * @returns {{ scale: number, panX: number, panY: number }}
 */
export function applyZoom(state, direction) {
  const delta = direction === 'in' ? 0.25 : -0.25;
  const newScale = clampScale(state.scale + delta);
  return { ...state, scale: newScale };
}

/**
 * Resets pan offsets to zero.
 * @param {{ scale: number, panX: number, panY: number }} state
 * @returns {{ scale: number, panX: number, panY: number }}
 */
export function resetPan(state) {
  return { ...state, panX: 0, panY: 0 };
}

/**
 * Applies the current scale and pan transform to the lightbox image,
 * and updates the zoom level display.
 */
function applyTransform() {
  const img = document.getElementById('lightbox-img');
  const zoomLevel = document.querySelector('.lightbox__zoom-level');
  if (img) {
    img.style.transform = `scale(${state.scale}) translate(${state.panX}px, ${state.panY}px)`;
  }
  if (zoomLevel) {
    zoomLevel.textContent = `${Math.round(state.scale * 100)}%`;
  }
}

/**
 * Initialises the lightbox — injects HTML into <body> on first call.
 * Subsequent calls are no-ops (idempotent).
 */
export function initLightbox() {
  // Idempotency guard — do nothing if already injected
  if (document.getElementById('lightbox')) {
    return;
  }

  // Create lightbox HTML structure
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Certificate viewer');
  lightbox.setAttribute('hidden', '');

  lightbox.innerHTML = `
    <div class="lightbox__backdrop"></div>
    <div class="lightbox__panel">
      <button class="lightbox__close" aria-label="Close certificate viewer">×</button>
      <div class="lightbox__image-wrap" id="lightbox-image-wrap">
        <img id="lightbox-img" src="" alt="" draggable="false">
      </div>
      <div class="lightbox__controls">
        <button class="lightbox__zoom-out" aria-label="Zoom out">−</button>
        <span class="lightbox__zoom-level" aria-live="polite">100%</span>
        <button class="lightbox__zoom-in" aria-label="Zoom in">+</button>
      </div>
      <p class="lightbox__caption" aria-live="polite"></p>
    </div>
  `;

  document.body.appendChild(lightbox);

  // Close button click
  lightbox.querySelector('.lightbox__close').addEventListener('click', () => {
    closeLightbox();
  });

  // Backdrop click
  lightbox.querySelector('.lightbox__backdrop').addEventListener('click', () => {
    closeLightbox();
  });

  // Escape key on document
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.isOpen) {
      closeLightbox();
    }
  });

  // Zoom-in button
  lightbox.querySelector('.lightbox__zoom-in').addEventListener('click', () => {
    const next = applyZoom(state, 'in');
    state.scale = next.scale;
    applyTransform();
  });

  // Zoom-out button
  lightbox.querySelector('.lightbox__zoom-out').addEventListener('click', () => {
    const next = applyZoom(state, 'out');
    state.scale = next.scale;
    applyTransform();
  });

  // Mouse drag panning
  const imageWrap = lightbox.querySelector('#lightbox-image-wrap');

  imageWrap.addEventListener('mousedown', (e) => {
    if (state.scale <= 1.0) return;
    state.isDragging = true;
    state.dragStartX = e.clientX - state.panX;
    state.dragStartY = e.clientY - state.panY;
    imageWrap.style.cursor = 'grabbing';
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!state.isDragging) return;
    state.panX = e.clientX - state.dragStartX;
    state.panY = e.clientY - state.dragStartY;
    applyTransform();
  });

  document.addEventListener('mouseup', () => {
    if (!state.isDragging) return;
    state.isDragging = false;
    imageWrap.style.cursor = 'grab';
  });

  // Touch: pinch-to-zoom and swipe-to-pan
  imageWrap.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      // Pinch start — record initial distance
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      state.lastPinchDistance = Math.hypot(dx, dy);
    } else if (e.touches.length === 1) {
      // Swipe start
      state.isDragging = true;
      state.dragStartX = e.touches[0].clientX - state.panX;
      state.dragStartY = e.touches[0].clientY - state.panY;
    }
    e.preventDefault();
  }, { passive: false });

  imageWrap.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2 && state.lastPinchDistance !== null) {
      // Pinch zoom
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const newDistance = Math.hypot(dx, dy);
      const ratio = newDistance / state.lastPinchDistance;
      state.scale = clampScale(state.scale * ratio);
      state.lastPinchDistance = newDistance;
      applyTransform();
    } else if (e.touches.length === 1 && state.isDragging) {
      // Swipe pan
      state.panX = e.touches[0].clientX - state.dragStartX;
      state.panY = e.touches[0].clientY - state.dragStartY;
      applyTransform();
    }
    e.preventDefault();
  }, { passive: false });

  imageWrap.addEventListener('touchend', () => {
    state.isDragging = false;
    state.lastPinchDistance = null;
  });
}

/**
 * Opens the lightbox for the given certificate.
 * @param {object} cert - Certificate object from certificates.json
 */
export function openLightbox(cert) {
  // Store the currently focused element before moving focus
  state.triggerElement = document.activeElement;

  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const img = document.getElementById('lightbox-img');
  const caption = lightbox.querySelector('.lightbox__caption');

  // Set image source and alt text
  img.src = cert.fullSrc;
  img.alt = cert.altText;

  // Handle fullSrc load error — fall back to thumbSrc
  img.onerror = () => {
    img.onerror = null; // prevent infinite loop
    img.src = cert.thumbSrc;
    if (caption) {
      const notice = lightbox.querySelector('.lightbox__error-notice');
      if (!notice) {
        const errorNotice = document.createElement('p');
        errorNotice.className = 'lightbox__error-notice';
        errorNotice.textContent = 'Full resolution image unavailable — showing thumbnail.';
        errorNotice.style.cssText = 'color: var(--color-gold); font-size: 0.8rem; text-align: center; margin: 0; padding: 4px;';
        caption.insertAdjacentElement('beforebegin', errorNotice);
      }
    }
  };

  // Populate caption
  if (caption) {
    caption.textContent = `${cert.caption} — ${certifierLabel(cert.certifier)}`;
  }

  // Show the lightbox
  lightbox.removeAttribute('hidden');

  // Prevent background scroll
  document.body.style.overflow = 'hidden';

  // Reset state
  state.scale = 1.0;
  state.panX = 0;
  state.panY = 0;
  state.isOpen = true;
  state.currentCertId = cert.id;

  // Apply initial transform and zoom level display
  applyTransform();

  // Move focus to the close button
  const closeBtn = lightbox.querySelector('.lightbox__close');
  if (closeBtn) {
    closeBtn.focus();
  }
}

/**
 * Closes the lightbox.
 */
export function closeLightbox() {
  if (!state.isOpen) return;

  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.setAttribute('hidden', '');

    // Remove any error notice from previous open
    const errorNotice = lightbox.querySelector('.lightbox__error-notice');
    if (errorNotice) {
      errorNotice.remove();
    }
  }

  // Restore background scroll
  document.body.style.overflow = '';

  // Update state
  state.isOpen = false;

  // Return focus to the element that triggered the lightbox
  if (state.triggerElement && typeof state.triggerElement.focus === 'function') {
    state.triggerElement.focus();
  }
}
