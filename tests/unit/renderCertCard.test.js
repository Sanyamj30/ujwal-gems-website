import { describe, it, expect } from 'vitest';
import { renderCertCard } from '../../js/filter.js';

const sampleCert = {
  id: 'cert-001',
  origin: 'zambian',
  certifier: 'gia',
  weightCt: 3.45,
  thumbSrc: 'images/certificates/cert-001-thumb.webp',
  fullSrc: 'images/certificates/cert-001-full.webp',
  altText: 'GIA certificate for a 3.45 carat Zambian natural emerald',
  caption: 'Verified Natural Emerald – 3.45 ct',
};

describe('renderCertCard(cert)', () => {
  it('returns an article element with class cert-card', () => {
    const card = renderCertCard(sampleCert);
    expect(card.tagName.toLowerCase()).toBe('article');
    expect(card.classList.contains('cert-card')).toBe(true);
  });

  it('sets img.src to cert.thumbSrc', () => {
    const card = renderCertCard(sampleCert);
    const img = card.querySelector('img');
    expect(img).not.toBeNull();
    // jsdom resolves relative URLs — check that src ends with the expected path
    expect(img.getAttribute('src')).toBe(sampleCert.thumbSrc);
  });

  it('sets img.alt to cert.altText', () => {
    const card = renderCertCard(sampleCert);
    const img = card.querySelector('img');
    expect(img.alt).toBe(sampleCert.altText);
  });

  it('sets caption text to cert.caption', () => {
    const card = renderCertCard(sampleCert);
    const caption = card.querySelector('.cert-card__caption');
    expect(caption).not.toBeNull();
    expect(caption.textContent).toBe(sampleCert.caption);
  });

  it('sets data-origin to cert.origin', () => {
    const card = renderCertCard(sampleCert);
    expect(card.dataset.origin).toBe(sampleCert.origin);
  });

  it('sets data-certifier to cert.certifier', () => {
    const card = renderCertCard(sampleCert);
    expect(card.dataset.certifier).toBe(sampleCert.certifier);
  });

  it('sets data-cert-id to cert.id', () => {
    const card = renderCertCard(sampleCert);
    expect(card.dataset.certId).toBe(sampleCert.id);
  });

  it('has tabindex="0", role="button", and aria-label', () => {
    const card = renderCertCard(sampleCert);
    expect(card.getAttribute('tabindex')).toBe('0');
    expect(card.getAttribute('role')).toBe('button');
    expect(card.getAttribute('aria-label')).toBe(`Open certificate: ${sampleCert.caption}`);
  });

  it('contains a .cert-card__frame div', () => {
    const card = renderCertCard(sampleCert);
    const frame = card.querySelector('.cert-card__frame');
    expect(frame).not.toBeNull();
  });

  it('img has loading="lazy"', () => {
    const card = renderCertCard(sampleCert);
    const img = card.querySelector('img');
    expect(img.loading).toBe('lazy');
  });
});
