/* ============================================================
   MAIN.JS - Handling basic interactions & HUD Toggle
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const btnEnter = document.getElementById('btn-enter-hud');
  const btnExit = document.getElementById('btn-exit-hud');
  const hudOverlay = document.getElementById('hud-overlay');
  
  if (btnEnter && hudOverlay) {
    btnEnter.addEventListener('click', () => {
      hudOverlay.classList.add('active');
      window.dispatchEvent(new Event('hud-activated'));
    });
  }

  if (btnExit && hudOverlay) {
    btnExit.addEventListener('click', () => {
      hudOverlay.classList.remove('active');
    });
  }

  // Close HUD on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hudOverlay.classList.contains('active')) {
      hudOverlay.classList.remove('active');
    }
  });

});
