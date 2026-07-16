const menuPanel = document.getElementById("menuPanel");
const menuBackdrop = document.getElementById("menuBackdrop");

function toggleMenu() {
  const isOpen = menuPanel.classList.toggle("is-open");

  menuBackdrop.classList.toggle("is-open", isOpen);
  menuPanel.setAttribute("aria-hidden", !isOpen);
  document.body.classList.toggle("menu-open", isOpen);
}

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape" && menuPanel.classList.contains("is-open")) {
    toggleMenu();
  }
});

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach(element => {
  revealObserver.observe(element);
});
const copyContactButtons = document.querySelectorAll("[data-copy]");

copyContactButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.dataset.copy;

    try {
      await navigator.clipboard.writeText(value);
      button.classList.add("copied");

      setTimeout(() => {
        button.classList.remove("copied");
      }, 1600);
    } catch (error) {
      console.error("Could not copy contact info:", error);
    }
  });
});
