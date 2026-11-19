const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navLinks.classList.toggle("open", !isOpen);
});

navLinks.addEventListener("click", (event) => {
  const clickedLink = event.target.closest("a");
  if (clickedLink) {
    menuButton.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("open");
    setActiveSection(clickedLink.getAttribute("href").slice(1));
  }
});

const sectionLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const pageSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function setActiveSection(sectionId) {
  sectionLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${sectionId}`;
    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}

function updateActiveSection() {
  const headerHeight = document.querySelector(".site-header")?.offsetHeight ?? 0;
  const marker = window.scrollY + headerHeight + 48;
  const currentSection = [...pageSections].reverse().find((section) => section.offsetTop <= marker);
  setActiveSection(currentSection?.id ?? pageSections[0]?.id);
}

window.addEventListener("scroll", updateActiveSection, { passive: true });
window.addEventListener("resize", updateActiveSection);
window.addEventListener("load", updateActiveSection, { once: true });
updateActiveSection();

document.querySelectorAll(".award-more").forEach((button) => {
  button.addEventListener("click", () => {
    const paragraph = document.getElementById(button.getAttribute("aria-controls"));
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isExpanded));
    paragraph.classList.toggle("is-expanded", !isExpanded);
    button.textContent = isExpanded ? "Show all →" : "Hide ↑";
  });
});



