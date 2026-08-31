// Netflix-Clone — populates rows with placeholder title cards.
// Titles and artwork are original/fictional; no real posters are used.

const palette = [
  ["#1f2937", "#0f172a"],
  ["#3b0f1a", "#140506"],
  ["#0f2a2e", "#04100f"],
  ["#2a1f3d", "#0d0817"],
  ["#3d2b0f", "#140d02"],
  ["#122a3d", "#040f17"],
  ["#3d0f2b", "#170208"],
  ["#0f3d1f", "#02170a"],
];

const catalog = {
  "Trending Now": [
    "Stranger Things", "The Crown", "Squid Game", "Wednesday", "Bridgerton",
    "The Witcher", "Money Heist", "Ozark", "Narcos", "Dark",
    "Outer Banks", "You", "The Diplomat", "The Fall", "Mindhunter"
  ],
  "Netflix Originals": [
    "Daredevil", "The Punisher", "Jessica Jones", "Luke Cage", "Iron Fist",
    "The Defenders", "Godless", "Marco Polo", "Altered Carbon", "Cyberpunk: Edgerunners",
    "Arcane", "Castlevania", "Castlevania: Nocturne", "Rebel Moon", "The Platform"
  ],
  "Critically Acclaimed Dramas": [
    "The Crown", "Mindhunter", "The Diplomat", "Godless", "Unbelievable",
    "The Haunting of Hill House", "The Haunting of Bly Manor", "Ratched", "Ozark",
    "Breaking Bad", "Better Call Saul", "The Diplomat", "Firefly Lane", "Sweet Magnolias"
  ],
  "Thrilling Series & Movies": [
    "Bird Box", "You", "The Fall", "Bodyguard", "The Watcher", "Dahmer",
    "Monster: The Jeffrey Dahmer Story", "Ryan Murphy", "Killer: Cases That Changed America",
    "Conversations with a Killer", "The Midnight Club", "Scream", "Fear Street Trilogy"
  ],
  "Award-Winning Content": [
    "The Crown", "The Queen's Gambit", "Succession", "The Last of Us", "Beef",
    "Glass Onion", "Don't Look Up", "The Adam Project", "Red Notice", "Murder Mystery",
    "Nobody Saves the World", "The Diplomat", "All of Us Are Dead"
  ],
  "Documentaries & Reality": [
    "Our Planet", "The Last Dance", "Fyre: The Greatest Party That Never Happened",
    "Tiger King", "The Social Dilemma", "The Great British Baking Show", "Cheer",
    "Love is Blind", "The Circle", "Terrace House", "High Score", "Jiro Dreams of Sushi"
  ],
  "Epic Fantasy & Adventure": [
    "House of the Dragon", "The Rings of Power", "The Witcher", "The Last Kingdom",
    "Vikings", "Wheel of Time", "Sandman", "The Mandalorian", "Dune",
    "Halo", "The Midnight Club", "Manifest", "Shadow and Bone", "The Midnight Gospel"
  ],
  "Medieval & Political Dramas": [
    "Game of Thrones", "House of the Dragon", "The Crown", "Succession", "The Borgias",
    "Vikings: Valhalla", "Peaky Blinders", "The Last Kingdom", "Reign", "The White Lotus",
    "Westworld", "Gentefied", "La Brea", "Kingdom"
  ],
  "Fantasy & Sci-Fi Series": [
    "Stranger Things", "Dark", "The Umbrella Academy", "Altered Carbon", "Arcane",
    "Castlevania: Nocturne", "The Witcher", "Shadow and Bone", "His Dark Materials",
    "The OA", "Sense8", "Killian Jones", "Midnight Gospel", "A Series of Unfortunate Events"
  ],
};

function createCard(title, colorPair) {
  const card = document.createElement("div");
  card.className = "card";

  const thumb = document.createElement("div");
  thumb.className = "card__thumb";
  // Use Unsplash image specific to the title
  const imageUrl = `https://source.unsplash.com/400x225/?${encodeURIComponent(title)}`;
  thumb.style.backgroundImage = `linear-gradient(135deg, ${colorPair[0]}cc, ${colorPair[1]}cc), url('${imageUrl}')`;
  thumb.style.backgroundSize = "cover";
  thumb.style.backgroundPosition = "center";

  const label = document.createElement("span");
  label.className = "card__label";
  label.textContent = title;
  thumb.appendChild(label);

  const overlay = document.createElement("div");
  overlay.className = "card__overlay";
  overlay.innerHTML = `
    <p class="card__overlay-title">${title}</p>
    <div class="card__overlay-actions">
      <button class="mini-btn mini-btn--play" aria-label="Play">
        <svg viewBox="0 0 24 24"><path d="M6 4l14 8-14 8V4z" fill="currentColor"/></svg>
      </button>
      <button class="mini-btn" aria-label="Add to list">
        <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>
      </button>
      <button class="mini-btn" aria-label="Like">
        <svg viewBox="0 0 24 24"><path d="M7 10v10M3 12v6a2 2 0 002 2h10.5a2 2 0 002-1.6l1.3-6A2 2 0 0016.8 10H13l1-4.5A1.5 1.5 0 0012.6 4L7 10z" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linejoin="round"/></svg>
      </button>
    </div>
    <p class="card__overlay-meta"><span class="match">${90 + (title.length % 9)}% Match</span><span class="hd">HD</span></p>
  `;

  card.appendChild(thumb);
  card.appendChild(overlay);
  return card;
}

function buildRows() {
  const rowEls = document.querySelectorAll(".row");
  rowEls.forEach((rowEl) => {
    const rowName = rowEl.getAttribute("data-row");
    const titles = catalog[rowName] || [];

    const heading = document.createElement("h3");
    heading.className = "row__title";
    heading.textContent = rowName;

    const track = document.createElement("div");
    track.className = "row__track";

    titles.forEach((title, i) => {
      const colorPair = palette[(title.length + i) % palette.length];
      track.appendChild(createCard(title, colorPair));
    });

    rowEl.appendChild(heading);
    rowEl.appendChild(track);
  });
}

function setupNavbarScroll() {
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("navbar--solid");
    } else {
      navbar.classList.remove("navbar--solid");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  buildRows();
  setupNavbarScroll();
});
