// read.js

document.addEventListener('DOMContentLoaded', () => {
  const readContent = document.getElementById('read-content');
  if (readContent) {
    readContent.innerHTML = `
      <section class="read-section">
        <h2>Our Mission</h2>
        <p>
          Irvington Counseling Center was established in 1961 with the goal of providing a variety of mental health services to the residents of Irvington and the surrounding communities. We believe that every individual should have access and be given an opportunity to receive therapeutic mental health services.
        </p>
      </section>
      <section class="read-section">
        <h2>Mental Health and Therapy</h2>
        <p>
          In the United States, 1 in 5 adults experience mental illness. We acknowledge that Mental Health is of significant importance to an individual's overall health. Therefore, we want you to know that<br>
          <span style="display:block;font-weight:bold;font-size:1.2em;color:#3fa7ff;margin:1em 0;">"IT IS OKAY, TO NOT BE OKAY."</span>
          Take the time to make your mental health a priority.
        </p>
        <p>
          Our team of therapists and APN's are equipped to help you with any mental health needs. Whether you are struggling with anxiety, depression, grief, family conflict, anger issues, mood disorders or any other mental health concerns, the ICC staff has the education and training to help individuals manage and come up with solutions to solve whatever it is that is causing discomfort and stress.
        </p>
        <div style="margin:1.2em 0 1.2em 1.2em;">
          <strong>HERE AT IRVINGTON COUNSELING CENTER WE OFFER:</strong>
          <ul style="margin-top:0.5em;">
            <li>One On One Therapy</li>
            <li>Family Therapy</li>
            <li>Couples/Marriage Counseling</li>
            <li>Anger Management</li>
            <li>Grief Counseling</li>
            <li>Other Mental Health Counseling</li>
          </ul>
        </div>
      </section>
      <section class="read-section">
        <h2>Psychiatric Services</h2>
        <p>
          We offer psychiatric evaluations and medication monitoring. Our APNS are equipped to give you further treatment if counseling does not help to alleviate your symptoms.
        </p>
        <p>
          We incorporate therapy and medication management as a combination treatment to help stabilize mental health and provide clients with a well-rounded therapeutic experience.
        </p>
        <p>
          Our treatment plans are individualized to meet each client's specific needs. There are options for Medication Management only as well as therapy alongside medication monitoring.
        </p>
      </section>
    `;
  }

  // Scroll up to top: if user scrolls above the page, redirect to menu
  window.addEventListener('scroll', () => {
    if (window.scrollY < -40) {
      window.location.href = '../menu/index.html';
    }
  });

  window.addEventListener('wheel', (e) => {
    if (window.scrollY === 0 && e.deltaY < -30) {
      window.location.href = '../menu/index.html';
    }
  }, { passive: true });
});
