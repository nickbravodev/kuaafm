// Accordion Control

const accordion = document.querySelectorAll(".accordion");

accordion.forEach((trigger) =>
  trigger.addEventListener("click", (e) => {
    const activePanel = e.target.closest(".accordion-panel");
    if (!activePanel) return;
    const panelTrigger = activePanel.querySelector("button");
    const expandedPanel = panelTrigger.getAttribute("aria-expanded") === "true";
    // Only collapse if the button, span, or svg in .accordion-icon-wrapper was clicked
    const isTriggerClick =
      e.target === panelTrigger ||
      e.target.closest(".accordion-icon-wrapper") ||
      e.target === activePanel.querySelector("span");
    if (expandedPanel && isTriggerClick) {
      closePanel(activePanel); // Collapses the active panel if open
    } else if (!expandedPanel) {
      toggleAccordion(activePanel); // Expands target if collapsed, collapses all others
      e.stopPropagation();
    }
  })
);

// Collapses all panels, including target
function closePanel(targetPanel) {
  const buttons = targetPanel.parentElement.querySelectorAll("button");
  const contents =
    targetPanel.parentElement.querySelectorAll(".accordion-content");
  const openToggles = targetPanel.parentElement.querySelectorAll(
    ".accordion-toggle-open"
  );
  const closeToggles = targetPanel.parentElement.querySelectorAll(
    ".accordion-toggle-close"
  );

  buttons.forEach((button) => {
    button.setAttribute("aria-expanded", false);
  });

  contents.forEach((content) => {
    content.setAttribute("aria-hidden", true);
  });

  openToggles.forEach((openToggle) => {
    openToggle.classList.remove("d-none");
  });

  closeToggles.forEach((closeToggle) => {
    closeToggle.classList.add("d-none");
  });
}

// If target panel is collapsed, expands target panel
function toggleAccordion(panelToActivate) {
  closePanel(panelToActivate);

  const trigger = panelToActivate.querySelector("button");
  trigger.setAttribute("aria-expanded", true);
  panelToActivate
    .querySelector(".accordion-content")
    .setAttribute("aria-hidden", false);
  panelToActivate
    .querySelector(".accordion-toggle-open")
    .classList.add("d-none");
  panelToActivate
    .querySelector(".accordion-toggle-close")
    .classList.remove("d-none");

  // Scroll to the top of the newly expanded panel after layout settles, only if not in view
  setTimeout(() => {
    const rect = trigger.getBoundingClientRect();
    const inView =
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth);
    if (!inView) {
      panelToActivate.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 500);
}
