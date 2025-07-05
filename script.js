// Rotating text options
const options = [
  'Individual Counseling',
  'Family Therapy',
  'Career Guidance and Support'
];
let current = 0;
const rotatingText = document.getElementById('rotatingText');
const rotatingLabel = document.getElementById('rotatingLabel');

// Add animated image to hero (fullscreen, centered)
const hero = document.getElementById('hero');
const animImg = document.createElement('img');
animImg.src = 'img/lp.png';
animImg.alt = 'Landing';
animImg.className = 'hero-img-anim';
hero.appendChild(animImg);

function typeText(text, element, callback) {
  element.textContent = '';
  let i = 0;
  function typeChar() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typeChar, 25); // typing speed in ms
    } else if (callback) {
      callback();
    }
  }
  typeChar();
}

function updateRotatingText() {
  const text = options[current];
  // Adjust min-width to keep centered
  const maxLen = Math.max(...options.map(opt => opt.length));
  rotatingText.style.minWidth = (maxLen * 0.7) + 'ch';
  typeText(text, rotatingLabel);
  current = (current + 1) % options.length;
}
updateRotatingText();
setInterval(updateRotatingText, 2000);

const specializing = document.getElementById('specializing');
let zoomed = false;
let navigating = false;

// Show the continue button when the rotating text is visible
const continueBtn = document.getElementById('continueBtn');
continueBtn.style.display = 'none';

function zoomOutFromRotatingBox() {
  const rotRect = rotatingText.getBoundingClientRect();
  const centerX = rotRect.left + rotRect.width / 2;
  const centerY = rotRect.top + rotRect.height / 2;
  // Start from normal scale, then zoom out
  specializing.style.zIndex = 10;
  specializing.style.transition = 'transform 0.8s cubic-bezier(.4,2,.6,1), opacity 0.7s';
  specializing.style.transform = `translate(0, 0) scale(1)`;
  specializing.style.opacity = '1';
  setTimeout(() => {
    specializing.style.transform = `translate(0, 0) scale(0.2)`;
    specializing.style.opacity = '0';
  }, 10);
}

function resetZoom() {
  specializing.style.transform = '';
  specializing.style.opacity = '';
  specializing.style.zIndex = '';
  document.body.style.overflow = '';
  document.body.style.background = '';
}

function seamlessNavigate(url) {
  if (navigating) return;
  navigating = true;
  document.body.style.transition = 'opacity 0.5s';
  document.body.style.opacity = '0';
  setTimeout(() => {
    window.location.href = url;
  }, 500);
}

let imageHideThreshold = 0.1;
let menuNavigateThreshold = 0.6;
let lockThreshold = 0.25;

window.addEventListener('scroll', () => {
  if (navigating) return;
  const scrollY = window.scrollY;
  const vh = window.innerHeight;
  if (scrollY > vh * imageHideThreshold) {
    animImg.style.opacity = '0';
    specializing.classList.add('visible');
    continueBtn.style.display = 'block';
  } else {
    animImg.style.opacity = '1';
    specializing.classList.remove('visible');
    continueBtn.style.display = 'none';
  }
});

continueBtn.addEventListener('click', () => {
  // Animate scroll to menuNavigateThreshold, then trigger the menu transition
  const vh = window.innerHeight;
  window.scrollTo({ top: vh * menuNavigateThreshold, behavior: 'smooth' });
  setTimeout(() => {
    zoomOutFromRotatingBox();
    setTimeout(() => {
      seamlessNavigate('menu/index.html');
      zoomed = true;
    }, 800);
  }, 600); // Wait for scroll animation
});

// Also allow click on rotating text to navigate
rotatingText.addEventListener('click', () => {
  if (!zoomed && !navigating) {
    zoomOutFromRotatingBox();
    setTimeout(() => {
      seamlessNavigate('menu/index.html');
      zoomed = true;
    }, 800);
  }
});

// Listen for back navigation from menu
window.addEventListener('popstate', () => {
  navigating = false;
  document.body.style.transition = 'opacity 0.5s';
  document.body.style.opacity = '1';
});
