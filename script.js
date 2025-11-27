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

// Typewriter thing – TỐI ƯU BẰNG requestAnimationFrame
const typewriter = document.querySelector(".typewriter");
if (typewriter) {
  const text = typewriter.getAttribute("data-text");
  typewriter.textContent = "";
  let i = 0;
  function typeStep() {
    if (i < text.length) {
      typewriter.textContent += text[i];
      i++;
      requestAnimationFrame(typeStep);
    }
  }
  requestAnimationFrame(typeStep);
}

// Cirle reveal anim + scroll
const progressCircles = document.querySelectorAll(".circle-progress");

const progressObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const circle = entry.target.querySelector("circle:nth-child(2)");
        const percent = entry.target.getAttribute("data-percent");
        const offset = 251 - (251 * percent) / 100;
        circle.style.strokeDashoffset = offset;
        entry.target.querySelector("span").textContent = percent + "%";

        // Animate feature bubbles
        entry.target.closest(".feature-bubble")?.style &&
          setTimeout(() => {
            entry.target.closest(".feature-bubble").style.opacity = "1";
            entry.target.closest(".feature-bubble").style.transform =
              "translateY(0)";
          }, entry.target.getAttribute("data-delay"));
      }
    });
  },
  { threshold: 0.3 }
);

progressCircles.forEach((circle) => {
  // SVG circle
  circle.innerHTML = `
    <svg width="80" height="80">
      <circle cx="40" cy="40" r="36" />
      <circle cx="40" cy="40" r="36" stroke-dasharray="251" stroke-dashoffset="251"/>
    </svg>
    <span></span>
  `;
  progressObserver.observe(circle);
});

// Reveal animation
const revealElements = document.querySelectorAll(
  ".reveal-left, .reveal-right, .fade-up, .issue-list li"
);
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");

        if (entry.target.tagName === "LI") {
          const delay = entry.target.getAttribute("data-delay") || 0;
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateX(0)";
          }, delay);
        }
      }
    });
  },
  { threshold: 0.15 }
);

document
  .querySelectorAll(
    ".reveal-left, .reveal-right, .fade-up, .issue-list li, .final-message"
  )
  .forEach((el) => {
    revealObserver.observe(el);
  });

revealElements.forEach((el) => revealObserver.observe(el));

//========== GOAL ==========

document
  .querySelectorAll(
    ".reveal-left, .reveal-right, .fade-up, .issue-list li, .final-message, .reveal-fade"
  )
  .forEach((el) => {
    revealObserver.observe(el);
  });

const goalCards = document.querySelectorAll(".goal-card");

const goalObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("revealed");
        }, i * 150); // stagger effect – từng cái hiện lần lượt
        goalObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

goalCards.forEach((card) => goalObserver.observe(card));

const finalGoalMessage = document.querySelector(".final-goal-message");

if (finalGoalMessage) {
  const finalObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("revealed");
          }, 300); // delay nhẹ cho đẹp
          finalObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  finalObserver.observe(finalGoalMessage);
}

// ===== CONTACT SECTION REVEAL =====
const contactContent = document.querySelector(".contact-content");
if (contactContent) {
  const contactObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          contactObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  contactObserver.observe(contactContent);
}

// ===== CLICK TO COPY INFO ITEMS + TOAST NOTIFICATION =====
document.querySelectorAll(".info-item").forEach((item) => {
  item.style.cursor = "pointer";
  item.style.transition = "all 0.3s ease";

  item.addEventListener("click", () => {
    const textToCopy = item.querySelector("span").textContent.trim();

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        item.style.transform = "scale(0.95)";
        setTimeout(() => (item.style.transform = ""), 150);

        let toast = document.querySelector(".copy-toast");
        if (!toast) {
          toast = document.createElement("div");
          toast.className = "copy-toast";
          toast.innerHTML = `<i class="bi bi-check2-circle"></i> Đã copy: ${textToCopy}`;
          document.body.appendChild(toast);
        } else {
          toast.innerHTML = `<i class="bi bi-check2-circle"></i> Đã copy: ${textToCopy}`;
        }

        toast.classList.remove("show");
        setTimeout(() => toast.classList.add("show"), 10);
        clearTimeout(toast.hideTimeout);
        toast.hideTimeout = setTimeout(() => {
          toast.classList.remove("show");
        }, 2500);
      })
      .catch(() => {
        alert("Copy thất bại! Vui lòng thử lại.");
      });
  });

  item.addEventListener("mouseenter", () => {
    item.style.color = "#a0c4ff";
    item.style.transform = "translateX(8px)";
  });
  item.addEventListener("mouseleave", () => {
    item.style.color = "";
    item.style.transform = "";
  });
});