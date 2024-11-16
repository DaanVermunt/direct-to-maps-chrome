chrome.commands.onCommand.addListener((command) => {
  if (command === "direct-to-maps") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      
      if (activeTab.url && activeTab.url.includes("www.google.com/search")) {
        chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          function: executeDomainSpecificTask,
        });
      } else {
      }
    });
  }
});

function executeDomainSpecificTask() {
  const url = new URL(window.location.href);
  const searchParams = url.searchParams;
  const search = searchParams.get("q");
  
  if (search) {
    window.location.href = `https://www.google.com/maps/search/${search}`;
  } else {
  }
}