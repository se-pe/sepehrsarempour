// Mark that JS is running, so the CSS reveal-on-scroll only hides content
// when it can actually reveal it again (no-JS users see everything).
document.documentElement.classList.add("js");

const menuPanel = document.getElementById("menuPanel");
const menuBackdrop = document.getElementById("menuBackdrop");

const menuTrigger = document.querySelector(".menu-button");
let menuPreviousFocus;
// CSS provides ordinary navigation if scripting is unavailable.
if (menuPanel) { menuPanel.inert = true; menuPanel.setAttribute("aria-hidden", "true"); }

function toggleMenu() {
  if (!menuPanel || !menuBackdrop) return;
  const isOpen = menuPanel.classList.toggle("is-open");

  menuBackdrop.classList.toggle("is-open", isOpen);
  menuPanel.setAttribute("aria-hidden", !isOpen);
  menuPanel.inert = !isOpen;
  menuTrigger?.setAttribute("aria-expanded", String(isOpen));
  if (isOpen) {
    menuPreviousFocus = document.activeElement;
    menuPanel.querySelector("button, a")?.focus();
  } else { menuPreviousFocus?.focus(); }
  document.body.classList.toggle("menu-open", isOpen);
}

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape" && menuPanel && menuPanel.classList.contains("is-open")) {
    toggleMenu();
  }
});

// Content is visible by default, including when an observer fails.
document.querySelectorAll(".reveal").forEach(element => element.classList.add("is-visible"));
document.addEventListener("keydown", event => {
  if (event.key !== "Tab" || !menuPanel?.classList.contains("is-open")) return;
  const items = [...menuPanel.querySelectorAll("a[href], button")];
  const first = items[0], last = items[items.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
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
const framedImages = document.querySelectorAll(".media-frame img, .collage-piece img");

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
