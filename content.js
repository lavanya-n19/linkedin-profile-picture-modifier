// Path to the new profile picture
const newProfilePicUrl = chrome.runtime.getURL('images/new-profile-pic.jpg');

// Function to replace profile pictures
function replaceProfilePictures() {
  // Select all profile picture elements
  const profilePictures = document.querySelectorAll('.feed-shared-actor__avatar-image');

  profilePictures.forEach(pic => {
    // Check if the current src is different from the newProfilePicUrl to avoid unnecessary updates
    if (pic.src !== newProfilePicUrl) {
      pic.src = newProfilePicUrl;
      pic.srcset = newProfilePicUrl;  // Handle responsive images
    }
  });
}

// Initial run to replace existing profile pictures
replaceProfilePictures();

// Set up a MutationObserver to handle dynamically loaded content
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length > 0) {
      replaceProfilePictures();
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });
