/* ============================================================
   EFFECTS.JS — Crosshair, Text Scramble, Magnetic Hover
   ============================================================ */

(function () {
  'use strict';

  // ── 1. Lens Cursor ──
  const cursorLens = document.querySelector('.cursor-lens');
  
  if (cursorLens && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      // Hardware accelerated translation
      cursorLens.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    });
    
    // Expand cursor on interactive elements
    const interactives = document.querySelectorAll('a, button, .proj-card, .data-table tr');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorLens.classList.add('active');
      });
      el.addEventListener('mouseleave', () => {
        cursorLens.classList.remove('active');
      });
    });
  }

  // ── 2. Magnetic Hover Effect ──
  const magnetics = document.querySelectorAll('.btn-override, .hero-links a, .proj-link');
  
  if (window.matchMedia('(pointer: fine)').matches) {
    magnetics.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        // Pull strength (0.3 is fairly strong)
        const strength = 0.3;
        
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        el.style.transition = 'transform 0.1s linear';
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
        el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      });
    });
  }

  // ── 3. Data Scramble on Hero Name ──
  class ScrambleText {
    constructor(el) {
      this.el = el;
      this.chars = '01#$*&%X_/';
      this.originalHTML = el.innerHTML;
      this.text1 = "SHOAIB";
      this.text2 = "ASGHAR";
    }
    
    start() {
      let frame = 0;
      const duration = 40;
      
      const update = () => {
        let complete = true;
        
        const processWord = (word, delayFrames) => {
          let out = '';
          for (let i = 0; i < word.length; i++) {
            const threshold = (i / word.length) * duration + delayFrames;
            if (frame > threshold + 10) {
              out += word[i];
            } else if (frame > threshold) {
              complete = false;
              out += this.chars[Math.floor(Math.random() * this.chars.length)];
            } else {
              complete = false;
              out += this.chars[Math.floor(Math.random() * this.chars.length)];
            }
          }
          return out;
        };
        
        const w1 = processWord(this.text1, 0);
        const w2 = processWord(this.text2, 10);
        
        this.el.innerHTML = w1 + '<br>' + w2;
        
        if (!complete) {
          frame++;
          requestAnimationFrame(update);
        } else {
          this.el.innerHTML = this.originalHTML;
        }
      }
      update();
    }
  }

  const heroName = document.querySelector('.hero-name');
  if (heroName) {
    const scrambler = new ScrambleText(heroName);
    setTimeout(() => scrambler.start(), 300); // Start slightly after page load
  }

})();
