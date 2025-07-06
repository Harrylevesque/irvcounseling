// You can add menu-specific JS here if needed
// For now, just a placeholder

let lastScrollY = 0;

window.addEventListener('scroll', () => {
  if (navigating) return;
  const scrollY = window.scrollY;
  const vh = window.innerHeight;
  const rotRect = rotatingText.getBoundingClientRect();
  // Detect scroll direction
  if (scrollY > vh * 0.6 && !zoomed) {
    // ...existing code for navigating to menu...
  } else if (scrollY <= vh * 0.6 && zoomed) {
    resetZoom();
    zoomed = false;
  } else if (scrollY <= vh * 0.6) {
    animImg.style.transform = 'translate(0, 0) scale(1)';
    animImg.style.opacity = '1';
    specializing.classList.remove('visible');
  }
  lastScrollY = scrollY;
});

// No menu-specific JS needed for info layout, but keep seamless scroll navigation
if (window.location.pathname.includes('/menu/index.html')) {
  let menuNavigating = false;
  window.addEventListener('wheel', (e) => {
    if (menuNavigating) return;
    // Scroll up at top: go to root
    if (window.scrollY === 0 && e.deltaY < 0) {
      menuNavigating = true;
      document.body.style.transition = 'opacity 0.5s';
      document.body.style.opacity = '0';
      setTimeout(() => {
        window.location.href = '../index.html';
      }, 500);
    }
    // Scroll down at bottom: go to contact
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && e.deltaY > 0) {
      menuNavigating = true;
      document.body.style.transition = 'opacity 0.5s';
      document.body.style.opacity = '0';
      setTimeout(() => {
        window.location.href = '../contact/index.html';
      }, 500);
    }
  }, { passive: true });
}
