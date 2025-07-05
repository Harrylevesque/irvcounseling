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

// Enable scroll up to go back from menu to root
// Enable scroll down at the bottom of the menu page to navigate to the contact page, matching the seamless navigation style.
if (window.location.pathname.includes('/menu/index.html')) {
  let menuNavigating = false;
  window.addEventListener('wheel', (e) => {
    if (menuNavigating) return;
    // Scroll up at top: go to root (already implemented)
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

// --- Animated triangle push and corner lines ---
function getTriangleCentroid(points) {
  // points: [{x, y}, {x, y}, {x, y}]
  return {
    x: (points[0].x + points[1].x + points[2].x) / 3,
    y: (points[0].y + points[1].y + points[2].y) / 3
  };
}

function fillTriangleOnClick(triangleEl, direction) {
  // direction: 'left' or 'right'
  if (triangleEl.classList.contains('animating')) return;
  triangleEl.classList.add('animating');
  const svg = document.querySelector('.split-diagonal');
  const line = svg.querySelector('line');
  const other = direction === 'left' ? document.querySelector('.split-right') : document.querySelector('.split-left');
  const label = triangleEl.querySelector('span');
  // Hide the label immediately when animation starts
  if (label) label.style.opacity = '0';
  const duration = 900;
  const start = performance.now();
  // Initial and final clip-paths
  let startClip, endClip;
  if (direction === 'left') {
    startClip = [
      {x:0, y:0}, {x:0, y:100}, {x:100, y:100}
    ];
    endClip = [
      {x:0, y:0}, {x:0, y:100}, {x:100, y:0}, {x:100, y:100}
    ];
  } else {
    startClip = [
      {x:0, y:0}, {x:100, y:0}, {x:100, y:100}
    ];
    endClip = [
      {x:0, y:0}, {x:100, y:0}, {x:0, y:100}, {x:100, y:100}
    ];
  }
  // Animate
  function lerp(a, b, t) { return a + (b - a) * t; }
  function step(now) {
    let progress = Math.min((now - start) / duration, 1);
    // Animate the triangle's clip-path
    let clip;
    if (direction === 'left') {
      // Animate top-right point from (100,100) to (100,0)
      const y = lerp(100, 0, progress);
      clip = `polygon(0% 0%, 0% 100%, 100% ${y}%, 100% 100%)`;
    } else {
      // Animate bottom-left point from (0,0) to (0,100)
      const y = lerp(0, 100, progress);
      clip = `polygon(0% 0%, 100% 0%, 0% ${y}%, 100% 100%)`;
    }
    triangleEl.style.clipPath = clip;
    // Fade out the other triangle
    if (other) {
      other.style.opacity = 1 - progress;
      other.style.transform = `scale(${1 - 0.1 * progress})`;
    }
    // Animate the diagonal line to a straight edge
    if (direction === 'left') {
      line.setAttribute('x1', 0);
      line.setAttribute('y1', 0);
      line.setAttribute('x2', 100);
      line.setAttribute('y2', lerp(100, 0, progress));
    } else {
      line.setAttribute('x1', 0);
      line.setAttribute('y1', lerp(0, 100, progress));
      line.setAttribute('x2', 100);
      line.setAttribute('y2', 100);
    }
    // Animate label to center (but hidden)
    if (label) {
      label.style.left = '50%';
      label.style.top = '50%';
      label.style.transform = 'translate(-50%, -50%) scale(' + (1 + 0.5 * progress) + ')';
      label.style.fontSize = 48 + 32 * progress + 'px';
      label.style.opacity = '0';
    }
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      // Snap to filled state
      triangleEl.style.clipPath = direction === 'left'
          ? 'polygon(0% 0%, 0% 100%, 100% 0%, 100% 100%)'
          : 'polygon(0% 0%, 100% 0%, 0% 100%, 100% 100%)';
      if (other) {
        other.style.opacity = 0;
        other.style.pointerEvents = 'none';
      }
      if (label) {
        label.style.left = '50%';
        label.style.top = '50%';
        label.style.transform = 'translate(-50%, -50%) scale(1.5)';
        label.style.fontSize = '80px';
        label.style.opacity = '0';
      }
      setTimeout(() => {
        // Example: alert or navigate
        // window.location.href = direction === 'left' ? 'left.html' : 'right.html';
      }, 350);
    }
  }
  requestAnimationFrame(step);
}

window.addEventListener('DOMContentLoaded', () => {
  const left = document.querySelector('.split-left');
  const right = document.querySelector('.split-right');
  if (left) left.addEventListener('click', () => fillTriangleOnClick(left, 'left'));
  if (right) right.addEventListener('click', () => {
    fillTriangleOnClick(right, 'right');
    setTimeout(() => {
      window.location.href = '../testimonials/index.html';
    }, 1250); // Wait for animation to finish
  });
});
