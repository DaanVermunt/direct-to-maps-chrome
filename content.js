const observer = new MutationObserver(() => {
  const searchParams = new URL(window.location.href).searchParams;
  const searchQuery = searchParams.get("q");
  
  // If a search query exists and button is not already added
  if (searchQuery && !document.querySelector('#maps-overlay-button')) {
    console.log('Search query detected, creating the button...');
    
    const button = document.createElement('div');
    button.id = 'maps-overlay-button';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.width = '50px';
    button.style.height = '50px';
    button.style.backgroundColor = '#ffffff';
    button.style.borderRadius = '10%';
    button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    button.style.cursor = 'pointer';
    button.style.zIndex = '10000';
    button.style.display = 'flex';
    button.style.alignItems = 'center';
    button.style.justifyContent = 'center';
    
    const icon = document.createElement('img');
    icon.src = chrome.runtime.getURL('logo-google-maps.svg');
    icon.style.width = '60%';
    icon.style.height = '60%';
    button.appendChild(icon);
    
    
    document.body.appendChild(button);
    
    button.addEventListener('click', () => {
      const mapsUrl = `https://www.google.com/maps/search/${searchQuery}`;
      window.location.href = mapsUrl;
    });
    
    observer.disconnect();
  }
});

// Start observing the DOM for changes
observer.observe(document.body, { childList: true, subtree: true });