// Footer year (optional)
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Modal elements
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalDetails = document.getElementById("modalDetails");
const modalImage = document.getElementById("modalImage");
const modalImageWrap = document.getElementById("modalImageWrap");

// Open modal with content
function openModal({ title, desc, details, image }) {
  if (!modal) return;

  modalTitle.textContent = title || "";
  modalDesc.textContent = desc || "";
  modalDetails.textContent = details || "";
  modalImage.alt = title ? `${title} image` : "Project image";

  if (image) {
    modalImage.src = image;
    modalImageWrap.classList.remove("is-placeholder");
  } else {
    modalImage.removeAttribute("src");
    modalImageWrap.classList.add("is-placeholder");
  }

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

// Close modal
function closeModal() {
  if (!modal) return;

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// Click any card to open modal
document.querySelectorAll(".card.clickable").forEach((card) => {
  card.addEventListener("click", () => {
    openModal({
      title: card.dataset.title,
      desc: card.dataset.desc,
      details: card.dataset.details,
      image: card.dataset.image,
    });
  });
});

// Close on backdrop / X button
if (modal) {
  modal.addEventListener("click", (e) => {
    const shouldClose = e.target?.dataset?.close === "true";
    if (shouldClose) closeModal();
  });
}

// Close on ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal?.classList.contains("is-open")) {
    closeModal();
  }
});
