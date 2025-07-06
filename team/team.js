// Fetch team data from team.json
function fetchTeamMembers() {
  return fetch('team.json')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load team.json');
      return response.json();
    });
}

// Load image URLs from ../img.txt
async function fetchTeamImages() {
  const res = await fetch('../img.txt');
  if (!res.ok) return [];
  const text = await res.text();
  return text.split(/\r?\n/).filter(Boolean);
}

async function setTeamBackground() {
  const res = await fetch('../img.txt');
  if (!res.ok) return;
  const text = await res.text();
  const images = text.split(/\r?\n/).filter(Boolean);
  if (images.length > 0) {
    document.body.classList.add('team-bg');
    document.body.style.backgroundImage = `url('${images[0]}')`;
  }
}

async function renderTeam() {
  await setTeamBackground();
  const container = document.getElementById('team-container');
  const [teamMembers, teamImages] = await Promise.all([
    fetchTeamMembers(),
    fetchTeamImages()
  ]);
  // Shuffle teamImages ONCE per render
  let shuffledImages = [...teamImages];
  for (let i = shuffledImages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledImages[i], shuffledImages[j]] = [shuffledImages[j], shuffledImages[i]];
  }
  // Assign each card a unique cover image by index, wrap if not enough images
  container.innerHTML = teamMembers.map((member, idx) => createProfileCard(member, idx, shuffledImages)).join('');
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
}

document.addEventListener('DOMContentLoaded', renderTeam);

function createProfileCard(member, idx, teamImages) {
  // Avatar: use member.pictureUrl or fallback
  let avatarUrl = member.pictureUrl || '/img/team/profile.png';
  // Cover: assign a unique image per card by index, wrap if not enough images
  let coverUrl = '';
  if (Array.isArray(teamImages) && teamImages.length > 0) {
    coverUrl = teamImages[idx % teamImages.length];
  }
  let coverDiv = '';
  if (coverUrl) {
    coverDiv = `<div class="card-cover" style="background-image:url('${coverUrl}');"></div>`;
  } else {
    coverDiv = `<div class="card-cover" style="background:#eaeaea;"></div>`;
  }
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
  return `
    <div class="card" data-state="#about">
      <div class="card-header">
        ${coverDiv}
        <img class="card-avatar" src="${avatarUrl}" alt="${member.name}" onerror=\"this.onerror=null;this.src='/img/team/profile.png'\" />
        <h1 class="card-fullname">${member.name}</h1>
        <hr class="card-divider" />
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
