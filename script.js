// ========== SIDEBAR ==========
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const menuIcon = document.getElementById("menu-icon");
const closeBtn = document.getElementById("close-btn");

menuIcon.onclick = () => {
  sidebar.classList.add("show");
  overlay.classList.add("show");
};
closeBtn.onclick = overlay.onclick = () => {
  sidebar.classList.remove("show");
  overlay.classList.remove("show");
};

// ========== CAROUSEL ==========
const carousel = document.getElementById("teamCarousel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const realCards = [...carousel.children];
const totalReal = realCards.length;
const cardWidth = realCards[0].offsetWidth + 32; // 280 + gap 32px

let index = 0;
let isAnimating = false;
let autoPlay;

// Duplicate all 7 cards
realCards.forEach((card) => {
  carousel.appendChild(card.cloneNode(true));
});

// Reset position
carousel.style.transform = `translateX(0)`;

// Move function
function slideTo(newIndex) {
  if (isAnimating) return;
  isAnimating = true;

  carousel.style.transition = "transform 0.75s cubic-bezier(0.4, 0, 0.2, 1)";
  carousel.style.transform = `translateX(-${cardWidth * newIndex}px)`;
}

// Transition end -> reset (if needed)
carousel.addEventListener("transitionend", () => {
  if (index >= totalReal) {
    index = 0;
    carousel.style.transition = "none";
    carousel.style.transform = `translateX(0)`;
  }
  if (index < 0) {
    index = totalReal - 1;
    carousel.style.transition = "none";
    carousel.style.transform = `translateX(-${cardWidth * index}px)`;
  }
  isAnimating = false;
});

// Navigation
nextBtn.onclick = () => {
  if (isAnimating) return;
  index++;
  slideTo(index);
  resetAutoPlay();
};

prevBtn.onclick = () => {
  if (isAnimating) return;
  index--;
  slideTo(index);
  resetAutoPlay();
};

// Auto play
function startAutoPlay() {
  autoPlay = setInterval(() => {
    index++;
    slideTo(index);
  }, 3500);
}
function resetAutoPlay() {
  clearInterval(autoPlay);
  startAutoPlay();
}

// Hover
document
  .querySelector(".team-container")
  .addEventListener("mouseenter", () => clearInterval(autoPlay));
document
  .querySelector(".team-container")
  .addEventListener("mouseleave", startAutoPlay);

startAutoPlay();