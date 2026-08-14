// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Modal elements
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalDetails = document.getElementById("modalDetails");
const modalImage = document.getElementById("modalImage");
const modalImageWrap = document.getElementById("modalImageWrap");
const modalStage = document.getElementById("modalStage");
const modalTools = document.getElementById("modalTools");
const modalOutcome = document.getElementById("modalOutcome");
const modalProblem = document.getElementById("modalProblem");
const modalRole = document.getElementById("modalRole");
const modalDecisions = document.getElementById("modalDecisions");
const modalLearned = document.getElementById("modalLearned");

function getDetailItems(details = "") {
  return details
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.toLowerCase().startsWith("key details"))
    .map((line) => line.replace(/^-\s*/, ""));
}

function getPipeItems(value = "") {
  return value
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
}

function renderList(target, items) {
  if (!target) return;

  target.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    target.appendChild(li);
  });
}

// Open modal with content
function openModal({ title, desc, details, image, imageFit, stage, tools, outcome, problem, role, decisions, learned }) {
  if (!modal) return;

  modalTitle.textContent = title || "";
  modalDesc.textContent = desc || "";
  modalStage.textContent = stage || "Portfolio project";
  modalTools.textContent = tools || "Design and prototyping";
  modalOutcome.textContent = outcome || "More build notes can be added here as the project develops.";
  modalProblem.textContent = problem || "Define, build, test, and improve a practical prototype.";
  modalRole.textContent = role || "Concept development, prototyping, testing, and iteration.";
  modalImage.alt = title ? `${title} image` : "Project image";

  renderList(modalDetails, getDetailItems(details));
  renderList(modalDecisions, getPipeItems(decisions));
  renderList(modalLearned, getPipeItems(learned));

  if (image) {
    modalImage.src = image;
    modalImageWrap.classList.remove("is-placeholder");
    modalImageWrap.classList.toggle("is-contained", imageFit === "contain");
  } else {
    modalImage.removeAttribute("src");
    modalImageWrap.classList.add("is-placeholder");
    modalImageWrap.classList.remove("is-contained");
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
document.querySelectorAll(".clickable").forEach((card) => {
  card.addEventListener("click", () => {
    openModal({
      title: card.dataset.title,
      desc: card.dataset.desc,
      details: card.dataset.details,
      image: card.dataset.image,
      imageFit: card.dataset.imageFit,
      stage: card.dataset.stage,
      tools: card.dataset.tools,
      outcome: card.dataset.outcome,
      problem: card.dataset.problem,
      role: card.dataset.role,
      decisions: card.dataset.decisions,
      learned: card.dataset.learned,
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
