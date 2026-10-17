import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import Lenis from 'lenis';

import { renderVoyages, renderLabours, renderPantheon, toRoman } from './render.js';
import { createSky } from './sky.js';

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---------------------------------------------------------------- content */
renderVoyages($('[data-voyages]'));
renderLabours($('[data-labours]'));
renderPantheon($('[data-pantheon]'));
$$('[data-roman-year]').forEach(el => (el.textContent = toRoman(new Date().getFullYear())));

/* ---------------------------------------------------------- smooth scroll */
let lenis = null;
if (!reduced) {
  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(time => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.stop();
}

function scrollToTarget(target) {
  if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.6, easing: t => 1 - Math.pow(1 - t, 4) });
  else (typeof target === 'number' ? window.scrollTo(0, target) : target.scrollIntoView());
}

$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const target = id === '#top' ? 0 : $(id);
    if (target === null) return;
    e.preventDefault();
    closeMenu();
    scrollToTarget(target);
  });
});

/* ------------------------------------------------------------------- nav */
const nav = $('.nav');
const burger = $('.nav__burger');
const menu = $('#menu');

function closeMenu() {
  document.body.classList.remove('menu-open');
  burger.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-hidden', 'true');
  lenis?.start();
}
burger.addEventListener('click', () => {
  const open = !document.body.classList.contains('menu-open');
  document.body.classList.toggle('menu-open', open);
  burger.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-hidden', String(!open));
  if (open) lenis?.stop();
  else lenis?.start();
});
window.addEventListener('keydown', e => e.key === 'Escape' && closeMenu());

let lastY = 0;
ScrollTrigger.create({
  start: 0,
  end: 'max',
  onUpdate: self => {
    const y = self.scroll();
    nav.classList.toggle('is-scrolled', y > 40);
    const menuOpen = document.body.classList.contains('menu-open');
    nav.classList.toggle('is-hidden', !menuOpen && y > 400 && y > lastY);
    lastY = y;
  },
});

// created after the pinned gallery so positions include its pin spacing
function navActive() {
  $$('.nav__links a').forEach(link => {
    const section = $(link.getAttribute('href'));
    ScrollTrigger.create({
      trigger: section,
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: self => link.classList.toggle('is-active', self.isActive),
    });
  });
}

/* ----------------------------------------------------------------- cursor */
if (finePointer && !reduced) {
  document.body.classList.add('has-cursor');
  const cursor = $('.cursor');
  const dot = $('.cursor__dot');
  const ring = $('.cursor__ring');
  const label = $('.cursor__label');
  const dx = gsap.quickTo(dot, 'x', { duration: 0.08 });
  const dy = gsap.quickTo(dot, 'y', { duration: 0.08 });
  const rx = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
  const ry = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });

  window.addEventListener('pointermove', e => {
    dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
  }, { passive: true });
  document.addEventListener('pointerleave', () => cursor.classList.add('is-hidden'));
  document.addEventListener('pointerenter', () => cursor.classList.remove('is-hidden'));

  document.addEventListener('pointerover', e => {
    const el = e.target.closest('a, button, [data-cursor]');
    if (!el) return;
    const text = el.dataset.cursor;
    if (text) { label.textContent = text; cursor.classList.add('is-label'); }
    else cursor.classList.add('is-hover');
  });
  document.addEventListener('pointerout', e => {
    const el = e.target.closest('a, button, [data-cursor]');
    if (!el || el.contains(e.relatedTarget)) return;
    cursor.classList.remove('is-hover', 'is-label');
  });

  // magnetic pull on primary actions
  $$('[data-magnetic]').forEach(el => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * 0.28);
      yTo((e.clientY - r.top - r.height / 2) * 0.4);
    });
    el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
  });
}

/* -------------------------------------------------------------------- sky */
const sky = createSky($('.hero__sky'), { reduced });
ScrollTrigger.create({
  trigger: '.hero',
  start: 'top bottom',
  end: 'bottom top',
  onToggle: self => (self.isActive ? sky.start() : sky.stop()),
});

/* --------------------------------------------------------- loader + intro */
function intro() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.from('.hero__word', { yPercent: 115, rotate: 4, duration: 1.6, stagger: 0.12 })
    .from('.hero__eyebrow', { opacity: 0, y: 20, duration: 1.2 }, '<0.3')
    .from('.portrait__arch', { clipPath: 'inset(100% 0 0 0 round 999px 999px 4px 4px)', duration: 1.8, ease: 'expo.inOut' }, 0)
    .from('.portrait__arch img', { scale: 1.5, duration: 2.2 }, 0)
    .from('.portrait__orbit', { opacity: 0, scale: 0.85, duration: 2 }, 0.6)
    .from('.portrait__plaque', { opacity: 0, y: 12, duration: 1 }, 1.1)
    .from('.hero__lede, .hero__actions', { opacity: 0, y: 30, duration: 1.4, stagger: 0.12 }, 0.5)
    .from('.hero__foot > *', { opacity: 0, y: 16, duration: 1, stagger: 0.1 }, 0.9)
    .from('.nav > *', { y: -30, opacity: 0, duration: 1.2, stagger: 0.06 }, 0.4)
    .from('.hero__sky', { opacity: 0, duration: 2.5, ease: 'power2.out' }, 0);
  return tl;
}

function runLoader() {
  const loader = $('.loader');
  const counter = $('[data-count]');
  const done = () => {
    document.body.classList.remove('is-loading');
    lenis?.start();
    ScrollTrigger.refresh();
  };

  if (reduced) {
    loader.remove();
    done();
    return;
  }

  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  const progress = { v: 0 };
  const tl = gsap.timeline();
  tl.to(progress, {
    v: 100,
    duration: 1.8,
    ease: 'power2.inOut',
    onUpdate: () => (counter.textContent = String(Math.round(progress.v)).padStart(3, '0')),
  })
    .to('.loader__ring', { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' }, 0)
    .from('.loader__mono', { opacity: 0, letterSpacing: '0.5em', duration: 1.4, ease: 'expo.out' }, 0)
    .from('.loader__line', { opacity: 0, y: 10, duration: 1 }, 0.3);

  Promise.all([fontsReady, new Promise(r => tl.eventCallback('onComplete', r))]).then(() => {
    gsap.timeline({ onComplete: () => { loader.remove(); } })
      .to('.loader__inner, .loader__line', { opacity: 0, y: -20, duration: 0.6, ease: 'power2.in' })
      .to(loader, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expo.inOut' }, '-=0.15')
      .add(() => { done(); intro(); }, '-=0.75');
  });
}

/* --------------------------------------------------------- scroll reveals */
function reveals() {
  // section titles: masked line rise
  $$('.section__title, .oracle__title').forEach(title => {
    const split = SplitText.create(title, { type: 'lines', mask: 'lines', linesClass: 'line' });
    gsap.from(split.lines, {
      yPercent: 110,
      duration: 1.4,
      stagger: 0.1,
      ease: 'expo.out',
      scrollTrigger: { trigger: title, start: 'top 85%' },
    });
  });

  $$('.section__head .eyebrow, .oracle__eyebrow').forEach(el =>
    gsap.from(el, { opacity: 0, x: -20, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } })
  );

  $$('.numeral').forEach(el =>
    gsap.from(el, { opacity: 0, yPercent: 30, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } })
  );

  // marquee drifts forever and leans into scroll velocity
  const track = $('.marquee__track');
  track.innerHTML += track.innerHTML;
  const loop = gsap.to(track, { xPercent: -50, duration: 40, ease: 'none', repeat: -1 });
  if (lenis) {
    lenis.on('scroll', ({ velocity }) => {
      gsap.to(loop, { timeScale: 1 + Math.min(Math.abs(velocity) * 0.25, 5), duration: 0.3, overwrite: true });
      gsap.to(loop, { timeScale: 1, duration: 1.2, delay: 0.3 });
    });
  }

  // genesis statement illuminates word by word
  const statement = $('[data-scrub-text]');
  const words = SplitText.create(statement, { type: 'words', wordsClass: 'word' }).words;
  gsap.to(words, {
    opacity: 1,
    stagger: 0.1,
    ease: 'none',
    scrollTrigger: { trigger: statement, start: 'top 75%', end: 'bottom 45%', scrub: true },
  });

  gsap.from('.tablet', { opacity: 0, y: 60, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: '.tablet', start: 'top 85%' } });
  gsap.from('.tablet__row', { opacity: 0, x: 20, duration: 1, stagger: 0.08, ease: 'expo.out', scrollTrigger: { trigger: '.tablet', start: 'top 80%' } });

  // feats count up
  $$('[data-countup]').forEach(el => {
    const target = parseFloat(el.dataset.countup);
    const decimals = Number(el.dataset.decimals || 0);
    const suffix = el.dataset.suffix || '';
    const fmt = v => v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    el.textContent = fmt(0);
    const obj = { v: 0 };
    gsap.to(obj, {
      v: target,
      duration: 2.2,
      ease: 'expo.out',
      onUpdate: () => (el.textContent = fmt(obj.v)),
      scrollTrigger: { trigger: el, start: 'top 90%' },
    });
  });
  gsap.from('.feat', { opacity: 0, y: 40, duration: 1.2, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: '.feats', start: 'top 88%' } });

  // voyages
  gsap.from('.voyage', { opacity: 0, y: 40, duration: 1.2, stagger: 0.08, ease: 'expo.out', scrollTrigger: { trigger: '.voyages', start: 'top 82%' } });

  // pantheon
  gsap.from('.temple__pediment', { scaleX: 0, duration: 1.6, ease: 'expo.inOut', scrollTrigger: { trigger: '.temple', start: 'top 80%' } });
  gsap.from('.temple__frieze, .temple__base', { scaleX: 0, duration: 1.6, ease: 'expo.inOut', scrollTrigger: { trigger: '.temple', start: 'top 80%' } });
  gsap.from('.deity', { opacity: 0, y: 70, duration: 1.3, stagger: 0.08, ease: 'expo.out', scrollTrigger: { trigger: '.temple', start: 'top 75%' } });

  // oracle
  gsap.from('.oracle__text, .oracle__mail, .oracle__socials', { opacity: 0, y: 30, duration: 1.2, stagger: 0.12, ease: 'expo.out', scrollTrigger: { trigger: '.oracle__text', start: 'top 90%' } });
  gsap.from('.meander', { backgroundPositionX: '-400px', ease: 'none', scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true } });

  // hero drifts away as you scroll
  gsap.to('.hero__grid', { yPercent: 18, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
}

/* ------------------------------------------------------- voyage accordion */
function voyages() {
  const items = $$('.voyage');
  const setOpen = (item, open, instant = false) => {
    const body = $('.voyage__body', item);
    item.classList.toggle('is-open', open);
    $('.voyage__head', item).setAttribute('aria-expanded', String(open));
    gsap.to(body, {
      height: open ? 'auto' : 0,
      duration: instant ? 0 : 0.9,
      ease: 'expo.inOut',
      onComplete: () => ScrollTrigger.refresh(),
    });
    if (open && !instant) gsap.from($$('.voyage__points li', item), { opacity: 0, y: 14, duration: 0.8, stagger: 0.05, delay: 0.25, ease: 'expo.out' });
  };
  items.forEach(item => {
    $('.voyage__head', item).addEventListener('click', () => {
      const open = !item.classList.contains('is-open');
      items.forEach(other => other !== item && other.classList.contains('is-open') && setOpen(other, false));
      setOpen(item, open);
    });
  });
  setOpen(items[0], true, true);
}

/* --------------------------------------------------------------- labours */
function labours() {
  const track = $('.labours__track');
  const cards = $$('.labour');

  // gold spotlight follows the pointer
  cards.forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  // sigils are drawn in gold leaf as each labour arrives
  const sigils = cards.map(card => {
    const parts = $$('.labour__sigil .s', card);
    const dots = $$('.labour__sigil .f', card);
    gsap.set(parts, { drawSVG: '0%' });
    gsap.set(dots, { scale: 0, transformOrigin: '50% 50%' });
    return gsap.timeline({ paused: true })
      .to(parts, { drawSVG: '100%', duration: 1.8, stagger: 0.03, ease: 'power2.inOut' })
      .to(dots, { scale: 1, duration: 0.6, stagger: 0.05, ease: 'back.out(3)' }, '-=0.8');
  });
  const io = new IntersectionObserver(
    entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      sigils[cards.indexOf(entry.target)].play();
      io.unobserve(entry.target);
    }),
    { threshold: 0.35 }
  );
  cards.forEach(c => io.observe(c));

  // desktop: pinned horizontal gallery
  const mm = gsap.matchMedia();
  mm.add('(min-width: 901px)', () => {
    const distance = () => track.scrollWidth - window.innerWidth;
    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: '.labours',
        pin: '.labours__pin',
        start: 'top top',
        end: () => `+=${distance()}`,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });
    gsap.to('.labours__progress span', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { trigger: '.labours', start: 'top top', end: () => `+=${distance()}`, scrub: true },
    });
    cards.forEach(card => {
      gsap.from($('.labour__sigil', card), {
        rotate: -25,
        ease: 'none',
        scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
      });
    });
  });
  mm.add('(max-width: 900px)', () => {
    cards.forEach(card =>
      gsap.from(card, { opacity: 0, y: 60, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: card, start: 'top 88%' } })
    );
  });
}

/* ------------------------------------------------------------------- boot */
voyages();
labours();
navActive();
if (!reduced) reveals();
else $$('[data-countup]').forEach(el => {
  const d = Number(el.dataset.decimals || 0);
  el.textContent = Number(el.dataset.countup).toLocaleString('en-US', { minimumFractionDigits: d }) + (el.dataset.suffix || '');
});
runLoader();
