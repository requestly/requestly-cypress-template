if (chrome.devtools.inspectedWindow.tabId > 0) {
  // Do not add panel for extension pages
  chrome.devtools.panels.create(
    "Requestly",
    "/resources/images/16x16.png",
    "/generated/devtools/panel/panel.html"
  );
}
