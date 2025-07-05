// Fetch team data from team.json
function fetchTeamMembers() {
  return fetch('team.json')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load team.json');
      return response.json();
    });
}

// Nature image pool (same as testimonials.js)
// const NATURE_IMAGES = [
//   'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
//   'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
//   'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80',
//   'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80',
//   'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80',
//   'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80',
//   'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80',
//   'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
//   // Add more if desired
// ];
function getRandomNatureImageUnsplash(seed) {
  // Use Unsplash random API for a unique image per person and visit
  // The 'sig' param ensures a different image for each person and visit
  const rand = Math.floor(Math.random() * 1000000);
  return `https://source.unsplash.com/800x400/?nature,landscape,forest,water&sig=${encodeURIComponent(seed + '-' + rand)}`;
}

function createProfileCard(member, idx) {
  // About section
  const aboutSection = `
    <div class="card-section is-active" data-section="about">
      <div class="card-content">
        <div class="card-subtitle">ABOUT</div>
        <p class="card-desc">${member.description}</p>
      </div>
    </div>
  `;
  // Experience section (array of strings)
  const expItems = (member.experience || [])
    .map(exp => {
      // Try to extract year and description
      const match = exp.match(/^\d{4}\s*(.*)$/);
      if (match) {
        return `<div class="card-item" data-year="${exp.slice(0,4)}">
          <div class="card-item-title">${match[1]}</div>
        </div>`;
      } else {
        return `<div class="card-item"><div class="card-item-title">${exp}</div></div>`;
      }
    })
    .join("");
  const expSection = `
    <div class="card-section" data-section="experience">
      <div class="card-content">
        <div class="card-subtitle">WORK EXPERIENCE</div>
        <div class="card-timeline">${expItems}</div>
      </div>
    </div>
  `;
  // Card HTML
  // Use Unsplash nature image, same as testimonials.js, based on index
  const coverUrl = `https://source.unsplash.com/400x300/?nature,water,forest,landscape,${idx+1}`;
  // Fix for relative image path
  let avatarUrl = member.pictureUrl;
  if (avatarUrl && !/^https?:/.test(avatarUrl)) {
    // Always use /img/team/ as the base path for avatars (absolute from root)
    avatarUrl = '/img/team/' + avatarUrl.replace(/^.*[\\\/]/, '');
  }
  // Failsafe: if image fails to load, use a random profile avatar
  // Use a random Unsplash avatar as fallback
  const fallbackAvatar = `https://source.unsplash.com/100x100/?portrait,face,person,profile&sig=${idx+1}`;
  return `
    <div class="card" data-state="#about">
      <div class="card-header">
        <div class="card-cover" style="background-image: url('${coverUrl}')"></div>
        <img class="card-avatar" src="${avatarUrl}" alt="${member.name}" onerror=\"this.onerror=null;this.src='${fallbackAvatar}'\" />
        <h1 class="card-fullname">${member.name}</h1>
        <h2 class="card-jobtitle">${member.jobTitle}</h2>
      </div>
      <div class="card-main">
        ${aboutSection}
        ${expSection}
        <div class="card-buttons">
          <button data-section="about" class="is-active">ABOUT</button>
          <button data-section="experience">EXPERIENCE</button>
        </div>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('team-container');
  fetchTeamMembers().then(teamMembers => {
    container.innerHTML = teamMembers.map((member, idx) => createProfileCard(member, idx)).join('');
    // Tab switching logic for all cards
    container.querySelectorAll('.card').forEach(card => {
      const buttons = card.querySelectorAll('.card-buttons button');
      const sections = card.querySelectorAll('.card-section');
      buttons.forEach(btn => {
        btn.addEventListener('click', e => {
          buttons.forEach(b => b.classList.remove('is-active'));
          btn.classList.add('is-active');
          const sectionName = btn.getAttribute('data-section');
          sections.forEach(sec => {
            if (sec.getAttribute('data-section') === sectionName) {
              sec.classList.add('is-active');
            } else {
              sec.classList.remove('is-active');
            }
          });
          card.setAttribute('data-state', `#${sectionName}`);
          if (sectionName !== 'about') {
            card.classList.add('is-active');
          } else {
            card.classList.remove('is-active');
          }
        });
      });
    });
  });
});
