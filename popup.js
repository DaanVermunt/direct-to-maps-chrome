chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    func: () => {
      const element = document.querySelector('a[href^="/maps"]');
      if (element) {
        window.location.href = element.href;
      } else {
        alert("No element found");
      }
    },
  });
});
