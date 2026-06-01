/**
 * js/filter.js — Certification Vault filter module
 *
 * Responsibilities:
 *  - filterCards(cards, filter): pure function — returns matching Certificate objects
 *  - setActiveFilter(buttons, filter): updates aria-pressed and active CSS class
 *  - renderCertCard(cert): returns a DOM <article> element for a certificate
 *
 * Implemented in Tasks 5 and 6
 */

/**
 * Filters an array of certificate objects by origin or certifier.
 * Returns all cards when filter is "all".
 *
 * @param {Array<{origin: string, certifier: string}>} cards
 * @param {string} filter
 * @returns {Array<{origin: string, certifier: string}>}
 */
export function filterCards(cards, filter) {
  if (filter === 'all') return cards;
  return cards.filter(
    (card) => card.origin === filter || card.certifier === filter
  );
}

/**
 * Sets the active filter button, updating aria-pressed and CSS class.
 * Exactly one button will have aria-pressed="true" after this call.
 *
 * @param {NodeList | Array<HTMLButtonElement>} buttons
 * @param {string} filter
 */
export function setActiveFilter(buttons, filter) {
  buttons.forEach((btn) => {
    const isActive = btn.dataset.filter === filter;
    btn.setAttribute('aria-pressed', String(isActive));
    btn.classList.toggle('filter-btn--active', isActive);
  });
}

/**
 * Renders a certificate card DOM element.
 *
 * @param {{ id: string, origin: string, certifier: string, weightCt: number,
 *           thumbSrc: string, fullSrc: string, altText: string, caption: string }} cert
 * @returns {HTMLElement}
 */
export function renderCertCard(cert) {
  const article = document.createElement('article');
  article.className = 'cert-card';
  article.dataset.certId = cert.id;
  article.dataset.origin = cert.origin;
  article.dataset.certifier = cert.certifier;
  article.dataset.weight = String(cert.weightCt);
  article.setAttribute('tabindex', '0');
  article.setAttribute('role', 'button');
  article.setAttribute('aria-label', `Open certificate: ${cert.caption}`);

  const frame = document.createElement('div');
  frame.className = 'cert-card__frame';

  const img = document.createElement('img');
  img.src = cert.thumbSrc;
  img.alt = cert.altText;
  img.loading = 'lazy';
  img.width = 400;
  img.height = 566;

  const caption = document.createElement('p');
  caption.className = 'cert-card__caption';
  caption.textContent = cert.caption;

  frame.appendChild(img);
  article.appendChild(frame);
  article.appendChild(caption);

  return article;
}
