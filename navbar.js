// Hamburger Menu Toggle
// This script enables the hamburger menu open/close functionality and closes the menu when clicking outside.
document.addEventListener('DOMContentLoaded', function() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const closeMenuBtn = document.getElementById('closeMenuBtn');

  if (hamburgerBtn && hamburgerMenu && closeMenuBtn) {
    hamburgerBtn.addEventListener('click', function() {
      hamburgerMenu.classList.toggle('open');
      hamburgerMenu.focus();
    });

    closeMenuBtn.addEventListener('click', function() {
      hamburgerMenu.classList.remove('open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!hamburgerMenu.contains(event.target) && !hamburgerBtn.contains(event.target)) {
        hamburgerMenu.classList.remove('open');
      }
    });
  }
});

