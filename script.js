/**
 * Portfolio Hero — script.js
 * Handles: load animations, typing effect, section nav observer, smooth scroll
 */

document.addEventListener("DOMContentLoaded", () => {
  initLoadAnimations();
  initTypingEffect();
  initSectionNavObserver();
  initSmoothScroll();
});

/* ============================================================
   LOAD ANIMATIONS — sequential CSS class toggles
   ============================================================ */
function initLoadAnimations() {
  const orbs = document.querySelector(".bg-orbs");
  const label = document.querySelector('[data-anim="label"]');
  const name = document.querySelector('[data-anim="name"]');
  const typing = document.querySelector('[data-anim="typing"]');
  const description = document.querySelector('[data-anim="description"]');
  const cta = document.querySelector('[data-anim="cta"]');
  const card = document.querySelector('[data-anim="card"]');

  const schedule = [
    { el: orbs, className: "visible", delay: 200 },
    { el: label, className: "visible", delay: 400 },
    { el: name, className: "visible", delay: 600 },
    { el: typing, className: "visible", delay: 800, callback: () => startTyping() },
    { el: description, className: "visible", delay: 1000 },
    { el: cta, className: "visible", delay: 1200 },
    { el: card, className: "visible", delay: 1400 },
  ];

  schedule.forEach(({ el, className, delay, callback }) => {
    if (!el) return;
    setTimeout(() => {
      el.classList.add(className);
      if (callback) callback();
    }, delay);
  });
}

/* ============================================================
   TYPING EFFECT — cycles through role titles
   ============================================================ */
const TYPING_PHRASES = [
  "FastAPI Engineer",
  "REST API Architect",
  "Backend Systems Builder",
];

let typingStarted = false;
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout = null;

function initTypingEffect() {
  // Typing starts via load animation callback at 0.8s
}

function startTyping() {
  if (typingStarted) return;
  typingStarted = true;
  typeNext();
}

function typeNext() {
  const textEl = document.getElementById("typingText");
  if (!textEl) return;

  const currentPhrase = TYPING_PHRASES[typingIndex];

  if (!isDeleting) {
    textEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      typingTimeout = setTimeout(typeNext, 2000);
      return;
    }
    typingTimeout = setTimeout(typeNext, 80);
  } else {
    textEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      typingIndex = (typingIndex + 1) % TYPING_PHRASES.length;
      typingTimeout = setTimeout(typeNext, 400);
      return;
    }
    typingTimeout = setTimeout(typeNext, 45);
  }
}

/* ============================================================
   SECTION NAV — Intersection Observer for active state
   ============================================================ */
function initSectionNavObserver() {
  const sectionIds = ["home", "about", "projects", "contact"];
  const navButtons = document.querySelectorAll(".section-nav-btn");

  const observerOptions = {
    root: null,
    rootMargin: "-40% 0px -40% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navButtons.forEach((btn) => {
          btn.classList.toggle("active", btn.dataset.section === id);
        });
      }
    });
  }, observerOptions);

  sectionIds.forEach((id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });

  /* Click handlers for section nav buttons */
  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

/* ============================================================
   SMOOTH SCROLL — anchor links
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href === "#" || !href) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({ top, behavior: "smooth" });
    });
  });
}
