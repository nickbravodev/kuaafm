const tabsContainer = document.querySelector(".tabs-container");
const tabsList = document.querySelector(".tabs__list");
const tabButtons = document.querySelectorAll(".tabs__button");
const tabPanels = document.querySelectorAll(".tab-panel");

tabsList.setAttribute("role", "tablist");
tabsList.querySelectorAll("li").forEach((listitem) => {
  listitem.setAttribute("role", "presentation");
});

tabButtons.forEach((tab, index) => {
  tab.setAttribute("role", "tab");
  if (index === 0) {
    tab.setAttribute("aria-selected", "true");
    //
  } else {
    tab.setAttribute("tabindex", "-1");
    tabPanels[index].setAttribute("hidden", "");
  }
});

tabPanels.forEach((panel) => {
  panel.setAttribute("role", "tabpanel");
  panel.setAttribute("tabindex", "0");
});

tabsContainer.addEventListener("click", (e) => {
  // console.log(e.target);
  const clickedTab = e.target.closest(".tabs__button");

  if (!clickedTab) return;
  e.preventDefault();
  switchTab(clickedTab);
});

tabsContainer.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      moveTabLeft();
      break;
    case "ArrowUp":
      moveTabLeft();
      break;
    case "ArrowRight":
      moveTabRight();
      break;
    case "ArrowDown":
      moveTabRight();
      break;
    case "Home":
      e.preventDefault();
      switchTab(tabButtons[0]);
      break;
    case "End":
      e.preventDefault();
      switchTab(tabButtons[tabButtons.length - 1]);
      break;
  }
});

function moveTabLeft() {
  const currentTab = document.activeElement;
  if (!currentTab.parentElement.previousElementSibling) {
    switchTab(tabButtons[tabButtons.length - 1]);
  } else {
    switchTab(currentTab.parentElement.previousElementSibling.querySelector(".tabs__button"));
  }
}

function moveTabRight() {
  const currentTab = document.activeElement;
  if (!currentTab.parentElement.nextElementSibling) {
    switchTab(tabButtons[0]);
  } else {
    switchTab(currentTab.parentElement.nextElementSibling.querySelector(".tabs__button"));
  }
}

function switchTab(newTab) {
  const activePanelId = newTab.getAttribute("href");
  const activePanel = tabsContainer.querySelector(activePanelId);

  tabButtons.forEach((button) => {
    button.setAttribute("aria-selected", false);
    button.setAttribute("tabindex", "-1");
  });

  tabPanels.forEach((panel) => {
    panel.setAttribute("hidden", true);
  });
  activePanel.removeAttribute("hidden");
  newTab.setAttribute("aria-selected", true);
  newTab.setAttribute("tabindex", "0");
  newTab.focus();
}
