```javascript
const videos = [
  {id: "VIDEO_ID_1", title: "Java Basics", category: "Programming"},
  {id: "VIDEO_ID_2", title: "Loops in Java", category: "Programming"},
  {id: "VIDEO_ID_3", title: "HTML Intro", category: "Web"},
  {id: "VIDEO_ID_4", title: "CSS Design", category: "Web"},
  {id: "VIDEO_ID_5", title: "Trading Basics", category: "Finance"}
];

// HERO
function setHero(video) {
  const hero = document.getElementById("hero");
  hero.style.backgroundImage =
    `url(https://img.youtube.com/vi/${video.id}/maxresdefault.jpg)`;

  hero.innerHTML = `
    <div class="hero-content">
      <h1>${video.title}</h1>
      <button onclick="openVideo('${video.id}')">▶ Play</button>
    </div>
  `;
}

// DISPLAY
function displayVideos(filter="") {
  const content = document.getElementById("content");
  content.innerHTML = "";

  const categories = {};

  videos.forEach(v => {
    if (!v.title.toLowerCase().includes(filter.toLowerCase())) return;

    if (!categories[v.category]) categories[v.category] = [];
    categories[v.category].push(v);
  });

  for (let cat in categories) {
    let section = `<div class="category"><h2>${cat}</h2><div class="row">`;

    categories[cat].forEach(v => {
      section += `
        <div class="card" onclick="openVideo('${v.id}')">
          <img src="https://img.youtube.com/vi/${v.id}/0.jpg">
        </div>
      `;
    });

    section += "</div></div>";
    content.innerHTML += section;
  }
}

// CONTINUE WATCHING
function showContinueWatching() {
  const content = document.getElementById("content");

  let section = `<div class="category"><h2>Continue Watching</h2><div class="row">`;

  videos.forEach(v => {
    let time = localStorage.getItem(v.id);
    if (time && time > 0) {
      section += `
        <div class="card" onclick="openVideo('${v.id}')">
          <img src="https://img.youtube.com/vi/${v.id}/0.jpg">
        </div>
      `;
    }
  });

  section += "</div></div>";
  content.innerHTML += section;
}

// NAVIGATION
function openVideo(id) {
  window.location.href = "watch.html?video=" + id;
}

// SEARCH
function searchVideos() {
  const val = document.getElementById("search").value;
  displayVideos(val);
  showContinueWatching();
}

// INIT
setHero(videos[0]);
displayVideos();
showContinueWatching();
```
