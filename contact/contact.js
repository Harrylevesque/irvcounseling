// Contact page JS (currently empty)
(function () {
  "use strict";
  // Form Validation
  const forms = document.querySelectorAll(".needs-validation");
  const result = document.getElementById("result");
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          form.querySelectorAll(":invalid")[0].focus();
        } else {
          // Form Submission using fetch()
          const formData = new FormData(form);
          event.preventDefault();
          event.stopPropagation();
          const object = {};
          formData.forEach((value, key) => {
            object[key] = value;
          });
          const json = JSON.stringify(object);
          result.innerHTML = "Please wait...";
          fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: json
          })
            .then(async (response) => {
              let json = await response.json();
              if (response.status == 200) {
                result.innerHTML = json.message;
                result.classList.remove("text-gray-500");
                result.classList.add("text-green-500");
              } else {
                result.innerHTML = json.message;
                result.classList.remove("text-gray-500");
                result.classList.add("text-red-500");
              }
            })
            .catch((error) => {
              result.innerHTML = "Something went wrong!";
            })
            .then(function () {
              form.reset();
              form.classList.remove("was-validated");
              setTimeout(() => {
                result.style.display = "none";
              }, 5000);
            });
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// --- Seamless scroll navigation between Contact and Menu ---
(function() {
  const isContact = window.location.pathname.includes('/contact/index.html');
  let navigating = false;
  if (isContact) {
    // Scroll up at top to menu (already present)
    window.addEventListener('wheel', (e) => {
      if (navigating) return;
      if (window.scrollY === 0 && e.deltaY < 0) {
        navigating = true;
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '0';
        setTimeout(() => {
          window.location.href = '../menu/index.html';
        }, 500);
      }
    }, { passive: true });

    // Scroll down at bottom to legal
    window.addEventListener('wheel', (e) => {
      if (navigating) return;
      const atBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2;
      if (atBottom && e.deltaY > 30) {
        navigating = true;
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '0';
        setTimeout(() => {
          window.location.href = '../legal/index.html';
        }, 500);
      }
    }, { passive: true });

    // Fade in on page load
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s';
    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        document.body.style.opacity = '1';
      }, 10);
    });
  }
})();

// Smooth navigation to legal page
function seamlessNavigateLegal() {
  document.body.style.transition = 'opacity 0.5s';
  document.body.style.opacity = '0';
  setTimeout(function() {
    window.location.href = '../legal/index.html';
  }, 500);
}

document.addEventListener('DOMContentLoaded', function() {
  var legalBtn = document.getElementById('legal-nav');
  if (legalBtn) {
    legalBtn.addEventListener('click', function(e) {
      e.preventDefault();
      seamlessNavigateLegal();
    });
  }
});
