document.addEventListener("DOMContentLoaded", () => {
  // --- Responsive Mobile Navigation ---
  const menuToggle = document.getElementById("mobile-menu");
  const navMenu = document.getElementById("nav-menu");

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    // Toggle the icon change between Bars and X
    const icon = menuToggle.querySelector("i");
    if (navMenu.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    } else {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  });

  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuToggle.querySelector("i").classList.remove("fa-xmark");
      menuToggle.querySelector("i").classList.add("fa-bars");
    });
  });

  // --- Lead Magnet Form Handler ---
  const leadForm = document.getElementById("lead-form");
  const successMsg = document.getElementById("form-success");

  if (leadForm) {
    leadForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Stop page from refreshing

      const emailInput = leadForm.querySelector('input[type="email"]').value;

      // Simulating API call/Success action
      if (emailInput) {
        leadForm.style.display = "none";
        successMsg.classList.remove("hidden");
      }
    });
  }
});

// --- Live Sorting Filter for Designs Page ---
const filterButtons = document.querySelectorAll(".filter-btn");
const designCards = document.querySelectorAll("#designs-grid .design-card");

if (filterButtons.length > 0 && designCards.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove class from old active buttons, bind onto current choice
      document.querySelector(".filter-btn.active").classList.remove("active");
      button.classList.add("active");

      const selectedFilter = button.getAttribute("data-filter");

      designCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");

        if (selectedFilter === "all" || cardCategory === selectedFilter) {
          card.classList.remove("fade-out");
        } else {
          card.classList.add("fade-out");
        }
      });
    });
  });
}
// --- Interactive Gallery Switcher ---
// --- Gallery Thumbnail Switcher Fix ---
const thumbBtns = document.querySelectorAll(".thumb-btn");
const galleryMain = document.getElementById("gallery-main");

if (thumbBtns.length > 0 && galleryMain) {
  thumbBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // 1. Remove active class from previous button
      document.querySelector(".thumb-btn.active").classList.remove("active");

      // 2. Add active class to clicked button
      btn.classList.add("active");

      // 3. Pull the new image source and caption attributes
      const imgUrl = btn.getAttribute("data-img");
      const caption = btn.getAttribute("data-caption");

      // 4. Inject a proper image tag instead of an icon tag
      galleryMain.innerHTML = `
                <img src="${imgUrl}" alt="${caption}" style="width:100%; height:100%; object-fit:cover; border-radius:8px;">
                <p class="view-caption">${caption}</p>
            `;
    });
  });
}

// --- Single Design Request Form Capture Handler ---
const designForm = document.getElementById("design-request-form");
const bookingSuccess = document.getElementById("booking-success");

if (designForm) {
  designForm.addEventListener("submit", (e) => {
    e.preventDefault();
    designForm.style.display = "none";
    bookingSuccess.classList.remove("hidden");
  });
}
// --- Complete Review Slider Engine with Navigation Dots ---
const track = document.getElementById("reviews-track");
const cards = document.querySelectorAll(".review-card");
const dotsContainer = document.getElementById("slider-dots");

if (track && cards.length > 0 && dotsContainer) {
  let currentIdx = 0;
  const totalCards = cards.length;
  let slideInterval;

  // 1. Automatically generate the pagination circles based on array length
  cards.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.classList.add("dot");
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
    if (index === 0) dot.classList.add("active");

    // Wire up individual dot click functionality
    dot.addEventListener("click", () => {
      resetAutoplay();
      goToSlide(index);
    });

    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  // 2. Main translation sliding execution rule
  function goToSlide(index) {
    currentIdx = index;

    // Slide track layout position
    track.style.transform = `translateX(-${currentIdx * 100}%)`;

    // Update active dots array mapping layout state
    document.querySelector(".dot.active").classList.remove("active");
    dots[currentIdx].classList.add("active");
  }

  // 3. Autoplay interval mechanism logic loops
  function startAutoplay() {
    slideInterval = setInterval(() => {
      let nextIdx = (currentIdx + 1) % totalCards;
      goToSlide(nextIdx);
    }, 5000); // 5000ms = 5 Seconds split intervals
  }

  function resetAutoplay() {
    clearInterval(slideInterval);
    startAutoplay(); // Restarts clock clean from 0 so it doesn't instantly flip away
  }

  // Launch sliding sequence engine on startup
  startAutoplay();
}
