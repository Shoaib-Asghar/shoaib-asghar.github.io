/* ============================================================
   ANIMATIONS.JS — GSAP ScrollTrigger Sequences
   ============================================================ */

(function () {
  'use strict';

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // ── 1. Hero Reveal Sequence ──
  const heroTl = gsap.timeline();
  
  heroTl.from('.top-bar', {
    y: -50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  })
  .from('.hero-role', {
    opacity: 0,
    x: -20,
    duration: 0.6,
    ease: 'power2.out'
  }, "-=0.4")
  .from('.spec-table tr', {
    opacity: 0,
    x: 20,
    stagger: 0.1,
    duration: 0.5,
    ease: 'power2.out'
  }, "-=0.4")
  .from('.hero-links a', {
    opacity: 0,
    y: 10,
    stagger: 0.1,
    duration: 0.4,
    ease: 'power2.out'
  }, "-=0.2");

  // ── 2. Content Blocks Scroll Triggers ──
  const blocks = document.querySelectorAll('.content-block');
  
  blocks.forEach(block => {
    // Animate the header
    const header = block.querySelector('.cb-header h2');
    if (header) {
      gsap.from(header, {
        scrollTrigger: {
          trigger: block,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -30,
        duration: 0.6,
        ease: 'power2.out'
      });
    }

    // Animate project cards if any
    const cards = block.querySelectorAll('.proj-card');
    if (cards.length > 0) {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: block,
          start: 'top 75%'
        },
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out'
      });
    }

    // Animate data tables if any
    const rows = block.querySelectorAll('.data-table tbody tr');
    if (rows.length > 0) {
      gsap.from(rows, {
        scrollTrigger: {
          trigger: block.querySelector('.data-table'),
          start: 'top 80%'
        },
        opacity: 0,
        x: -20,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
    
    // Animate tag clouds
    const tags = block.querySelectorAll('.tag');
    if (tags.length > 0) {
      gsap.from(tags, {
        scrollTrigger: {
          trigger: block.querySelector('.tag-cloud'),
          start: 'top 85%'
        },
        opacity: 0,
        scale: 0.9,
        stagger: 0.02,
        duration: 0.4,
        ease: 'back.out(1.5)'
      });
    }
  });

  // ── 3. Parallax Images ──
  // A subtle zoom out effect while scrolling to give depth
  const images = document.querySelectorAll('.photo-container img, .proj-img-wrap img');
  images.forEach(img => {
    gsap.fromTo(img, 
      { scale: 1.15, transformOrigin: 'center center' },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: img.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );
  });

})();
