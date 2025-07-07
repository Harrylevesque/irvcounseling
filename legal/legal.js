// legal.js

document.addEventListener('DOMContentLoaded', () => {
  const legalContainer = document.getElementById('legal-container');
  if (legalContainer) {
    legalContainer.innerHTML = `
      <div class="legal-card">
        <div class="legal-title">Insurance and Payment</div>
        <div class="legal-section">
          <div class="legal-section-title">My BrandSite's image</div>
          <div class="legal-section-content">
            <!-- You can add an <img> tag here if you have a logo or image -->
          </div>
        </div>
        <div class="legal-section">
          <div class="legal-section-title">Accepted Insurances & Payment Options</div>
          <div class="legal-section-content">
            We accept Medicaid and Medicare as well as Private Insurances. If you do not have insurance, we can apply for coverage through a state funded indigent insurance, risk free. If you do not qualify, we can discuss a payment plan to make sure your appointments are covered. We understand the importance of mental health needs and we are willing to help you get coverage for your services.
          </div>
        </div>
        <div class="legal-section">
          <div class="legal-section-title">Fee for Service</div>
          <div class="legal-section-content">
            If you have no insurance or do not qualify as indigent, there is a flat rate charge for our services:<br>
            <ul style="margin-top:0.5em;">
              <li><strong>Counseling services</strong> - $30 Per session</li>
              <li><strong>Psychiatric Services</strong> - $50 Per session</li>
            </ul>
          </div>
        </div>
        <div class="legal-section">
          <div class="legal-section-title">List Of Accepted Private Insurances</div>
          <div class="legal-section-content">
            <ul style="columns:2;max-width:500px;margin:0 auto;">
              <li>Aetna</li>
              <li>Aetna Betterhealth</li>
              <li>Amerigroup/Wellpoint</li>
              <li>Carelon</li>
              <li>Cigna</li>
              <li>Clover</li>
              <li>Emblem Behavioral Health</li>
              <li>Fidelis/Wellcare</li>
              <li>Horizon Blue Cross Blue Shield</li>
              <li>Horizon NJ Health</li>
              <li>Humana</li>
              <li>Meritain</li>
              <li>United Healthcare</li>
              <li>Value Options</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  // Scroll up to top: if user scrolls above the page, redirect to contact
  window.addEventListener('scroll', () => {
    if (window.scrollY < -40) {
      window.location.href = '../contact/index.html';
    }
  });

  window.addEventListener('wheel', (e) => {
    if (window.scrollY === 0 && e.deltaY < -30) {
      window.location.href = '../contact/index.html';
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
});
