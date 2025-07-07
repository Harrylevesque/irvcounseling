async function fetchTestimonialImages() {
  const res = await fetch('../img.txt');
  if (!res.ok) return [];
  const text = await res.text();
  return text.split(/\r?\n/).filter(Boolean);
}

const quotes = [
  '"In every walk with nature one receives far more than he seeks." — John Muir',
  '"The earth has music for those who listen." — Shakespeare',
  '"Adopt the pace of nature: her secret is patience." — Ralph Waldo Emerson',
  '"Look deep into nature, and then you will understand everything better." — Albert Einstein',
  '"To plant a garden is to believe in tomorrow." — Audrey Hepburn',
  '"And into the forest I go, to lose my mind and find my soul." — John Muir',
  '"Nature does not hurry, yet everything is accomplished." — Lao Tzu',
  '"The clearest way into the Universe is through a forest wilderness." — John Muir',
  '"Just living is not enough... one must have sunshine, freedom, and a little flower." — Hans Christian Andersen',
  '"The best view comes after the hardest climb."',
  '"Every flower is a soul blossoming in nature." — Gérard de Nerval',
  '"Wherever you go, leave a trail of kindness."',
  '"Let the beauty of what you love be what you do." — Rumi',
  '"The mountains are calling and I must go." — John Muir',
  '"Breathe in peace, breathe out stress."',
  '"To walk in nature is to witness a thousand miracles." — Mary Davis',
  '"Sunshine is the best medicine."',
  '"There is no Wi-Fi in the forest, but you will find a better connection."',
  '"The earth laughs in flowers." — Ralph Waldo Emerson',
  '"Wilderness is not a luxury but a necessity of the human spirit." — Edward Abbey',
  '"Let nature be your teacher." — William Wordsworth',
  '"In the woods, we return to reason and faith." — Ralph Waldo Emerson',
  '"The silence of nature is very real. It surrounds you, you can feel it." — Ted Trueblood',
  '"Nature always wears the colors of the spirit." — Ralph Waldo Emerson',
  '"The poetry of the earth is never dead." — John Keats',
  '"Green is the prime color of the world." — Pedro Calderón de la Barca',
  '"The goal of life is living in agreement with nature." — Zeno',
  '"Nature is not a place to visit. It is home." — Gary Snyder',
  '"The sun, the sand, and a quiet mind."',
  '"To forget how to dig the earth and to tend the soil is to forget ourselves." — Gandhi',
  '"The sound of rain needs no translation."',
  '"A walk in nature walks the soul back home." — Mary Davis',
  '"The sky is the daily bread of the eyes." — Ralph Waldo Emerson',
  '"There are always flowers for those who want to see them." — Henri Matisse',
  '"The ocean stirs the heart, inspires the imagination." — Wyland',
  '"Nature does nothing in vain." — Aristotle',
  '"The earth is what we all have in common." — Wendell Berry',
  '"The world is full of magic things, patiently waiting for our senses to grow sharper." — W.B. Yeats',
  '"The beauty of the natural world lies in the details." — Natalie Angier',
  '"Colors are the smiles of nature." — Leigh Hunt',
  '"The river is everywhere." — Hermann Hesse',
  '"Nature is pleased with simplicity." — Isaac Newton',
  '"The earth has its music for those who will listen." — Reginald Holmes',
  '"The sun does not shine for a few trees and flowers, but for the wide world\'s joy." — Henry Ward Beecher',
  '"The beauty of nature is in the details."',
  '"The wind speaks, and the trees listen."',
  '"The world is mud-luscious and puddle-wonderful." — E.E. Cummings',
  '"Nature is the art of God." — Dante Alighieri',
  '"The earth is the mother of all people." — Black Elk',
  '"The best remedy for those who are afraid is to go outside." — Anne Frank',
  '"The sky broke like an egg into full sunset and the water caught fire." — Pamela Hansford Johnson',
  '"The beauty of the earth fills my soul."',
  '"The forest makes your heart gentle." — Pha Pachak',
  '"The world is but a canvas to our imagination." — Henry David Thoreau',
  '"The sound of water is worth more than all the poets\' words." — Octavio Paz',
  '"The earth is a fine place and worth fighting for." — Ernest Hemingway',
  '"The peace of wild things." — Wendell Berry',
  '"The world is full of beauty when your heart is full of love."'
];

async function createMasonryItems() {
  const images = await fetchTestimonialImages();
  const masonryItems = [];

  // Shuffle images for random assignment on each refresh
  let shuffledImages = [...images];
  for (let i = shuffledImages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledImages[i], shuffledImages[j]] = [shuffledImages[j], shuffledImages[i]];
  }

  for (let i = 0; i < quotes.length; i++) {
    const imageUrl = shuffledImages.length > 0 ? shuffledImages[i % shuffledImages.length] : '';
    masonryItems.push({
      img: imageUrl,
      quote: quotes[i]
    });
  }

  return masonryItems;
}

function createMasonryItemHTML(item) {
  return `<div class="masonry-item">
    <img class="masonry-img" src="${item.img}" alt="Nature scene" />
    <div class="masonry-quote">${item.quote}</div>
  </div>`;
}

function createMasonryRowHTML(items) {
  return `<div class="masonry-row">${items.map(createMasonryItemHTML).join('')}</div>`;
}

document.addEventListener('DOMContentLoaded', async () => {
  const masonryGrid = document.getElementById('masonryGrid');
  if (masonryGrid) {
    const masonryItems = await createMasonryItems();
    // Arrange items into rows (2 per row)
    const itemsPerRow = 2;
    const rows = [];
    for (let i = 0; i < masonryItems.length; i += itemsPerRow) {
      rows.push(masonryItems.slice(i, i + itemsPerRow));
    }
    // Duplicate rows for seamless vertical scroll
    const allRows = rows.concat(rows);
    const scrollWrapper = document.createElement('div');
    scrollWrapper.className = 'masonry-scroll-vertical';
    scrollWrapper.innerHTML = allRows.map(createMasonryRowHTML).join('');
    masonryGrid.appendChild(scrollWrapper);
  }
});
