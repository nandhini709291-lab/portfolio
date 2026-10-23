
// =========================
// 1. Mobile navigation
// =========================
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";

    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

// =========================
// 2. Light and dark theme
// =========================
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-theme");

  themeToggle.textContent = isDark ? "☀" : "☾";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
  themeToggle.title = isDark ? "Switch to light mode" : "Switch to dark mode";
});

// =========================
// 3. Project category filter
// =========================
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    projectCards.forEach((card) => {
      const category = card.dataset.category;

      card.hidden =
        selectedFilter !== "all" && category !== selectedFilter;
    });
  });

  button.setAttribute(
    "aria-pressed",
    String(button.classList.contains("active"))
  );
});

// =========================
// 4. Contact form validation
// =========================
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = "Please fill in all the fields.";
    return;
  }

  // Basic email-format check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    formStatus.textContent = "Please enter a valid email address.";
    document.getElementById("email").focus();
    return;
  }

  // This demo validates the form but does not send any messages.
  formStatus.textContent =
    "Thank you, " + name + "! Your details are valid. " +
    "This demo form does not send messages.";

  contactForm.reset();
});

// =========================
// 5. Automatic footer year
// =========================
document.getElementById("year").textContent =
  new Date().getFullYear();

// =========================
// 6. Highlight navigation
//    while scrolling
// =========================
const sections = document.querySelectorAll("main section[id]");

function updateActiveLink() {
  let currentSection = "home";

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop <= 150) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive =
      link.getAttribute("href") === "#" + currentSection;

    link.classList.toggle("active", isActive);
  });
}

window.addEventListener("scroll", updateActiveLink, {
  passive: true
});

updateActiveLink();
