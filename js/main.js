const menuPanel = document.getElementById("menuPanel");
const menuBackdrop = document.getElementById("menuBackdrop");

function toggleMenu() {
  const isOpen = menuPanel.classList.toggle("is-open");

  menuBackdrop.classList.toggle("is-open", isOpen);
  menuPanel.setAttribute("aria-hidden", !isOpen);
  document.body.classList.toggle("menu-open", isOpen);
}

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape" && menuPanel && menuPanel.classList.contains("is-open")) {
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

// Gracefully hide empty / broken placeholder images so the grey frame shows
const framedImages = document.querySelectorAll(".media-frame img");

framedImages.forEach((img) => {
  const markEmpty = () => img.classList.add("is-empty");

  if (img.complete && img.naturalWidth === 0) {
    markEmpty();
  }

  img.addEventListener("error", markEmpty);
});

// Lightbox: click any .zoomable image to view the full version
const zoomables = document.querySelectorAll(".zoomable");

if (zoomables.length) {
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.setAttribute("aria-hidden", "true");
  lightbox.innerHTML =
    '<button class="lightbox-close" type="button" aria-label="Close">×</button>' +
    '<img alt="" />' +
    '<p class="lightbox-caption"></p>';
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector("img");
  const lightboxCaption = lightbox.querySelector(".lightbox-caption");
  const lightboxClose = lightbox.querySelector(".lightbox-close");

  function openLightbox(src, alt) {
    lightboxImage.src = src;
    lightboxImage.alt = alt || "";
    lightboxCaption.textContent = alt || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
    lightboxImage.removeAttribute("src");
  }

  zoomables.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img") || item;
      const fullSrc = item.dataset.full || img.getAttribute("src");

      if (fullSrc) {
        openLightbox(fullSrc, img.getAttribute("alt"));
      }
    });
  });

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
}
