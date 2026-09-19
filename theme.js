// Apply the saved theme before styles render to avoid a flash on navigation.
(() => {
  const key = "e-creates-theme";
  const system = window.matchMedia("(prefers-color-scheme: dark)");
  const isTheme = (value) => value === "light" || value === "dark";
  let preference = null;
  try {
    const saved = localStorage.getItem(key);
    if (isTheme(saved)) preference = saved;
  } catch {
    // The switch still works when browser storage is unavailable.
  }

  function applyTheme() {
    const theme = preference || (system.matches ? "dark" : "light");
    document.documentElement.dataset.theme = theme;
    const toggle = document.querySelector(".theme-toggle");
    if (toggle) {
      const label = `Switch to ${theme === "dark" ? "light" : "dark"} theme`;
      toggle.setAttribute("aria-label", label);
      toggle.title = label;
      toggle.hidden = false;
    }
  }

  applyTheme();
  system.addEventListener("change", () => {
    if (!preference) applyTheme();
  });
  window.addEventListener("storage", (event) => {
    if (event.key === key || event.key === null) {
      preference = isTheme(event.newValue) ? event.newValue : null;
      applyTheme();
    }
  });
  document.addEventListener("DOMContentLoaded", () => {
    applyTheme();
    document.querySelector(".theme-toggle")?.addEventListener("click", () => {
      preference = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(key, preference);
      } catch {
        // Keep the selected theme for this page even without storage.
      }
      applyTheme();
    });
  });
})();
