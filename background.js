// background.js
chrome.commands.onCommand.addListener((command) => {
  if (command === "direct-to-maps") {
    // Get the active tab in the current window
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];

      // Check if the active tab's domain is in the list of allowed domains
      if (activeTab.url.includes("www.google.com/search")) {
        // Execute the command's functionality
        chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          function: executeDomainSpecificTask,
        });
      }
    });
  }
});

// The function to execute only on specified domains
function executeDomainSpecificTask() {
  const url = new URL(window.location.href);
  const searchpParams = url.searchParams;
  const search = searchpParams.get("q");
  window.location.href = `https://www.google.com/maps/search/${search}`;
}
