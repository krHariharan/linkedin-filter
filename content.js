console.log('LinkedIn Filter - Content script loaded');

let preferences = {
    jobsEnabled: true,
    researchEnabled: true,
    businessEnabled: true
  };
  
  let keywords = DEFAULT_KEYWORDS;
  let filterCount = 0;

function classifyPost(postText) {
  postText = postText.toLowerCase();
  const classifications = {
    isJob: false,
    isResearch: false,
    isBusiness: false
  };
  
  classifications.isJob = keywords.job.some(keyword => 
    postText.includes(keyword.toLowerCase())
  );
  
  classifications.isResearch = keywords.research.some(keyword => 
    postText.includes(keyword.toLowerCase())
  );
  
  classifications.isBusiness = keywords.business.some(keyword => 
    postText.includes(keyword.toLowerCase())
  );
  
  console.log('LinkedIn Filter - Classified post:', classifications);
  return classifications;
}
  
function shouldShowPost(classifications) {
    return (
      (preferences.jobsEnabled && classifications.isJob) ||
      (preferences.researchEnabled && classifications.isResearch) ||
      (preferences.businessEnabled && classifications.isBusiness)
    );
  }

function filterPosts() {
  const posts = document.querySelectorAll('.feed-shared-update-v2');
  let localFilterCount = 0;
  
  console.log('LinkedIn Filter - Filtering posts. Total posts:', posts.length);
  
  posts.forEach(post => {
    const postText = post.textContent;
    const classifications = classifyPost(postText);
    
    if (!shouldShowPost(classifications)) {
      post.style.display = 'none';
      localFilterCount++;
    } else {
      post.style.display = 'block';
    }
  });
  
  if (localFilterCount !== filterCount) {
    filterCount = localFilterCount;
    chrome.storage.sync.set({ filterCount });
    console.log('LinkedIn Filter - Filter count updated:', filterCount);
  }
}

// Load settings from storage
function loadSettings() {
  chrome.storage.sync.get(['preferences', 'keywords'], (result) => {
    console.log('LinkedIn Filter - Settings loaded:', result);
    if (result.preferences) {
      preferences = result.preferences;
    }
    if (result.keywords) {
      keywords = result.keywords;
    }
    filterPosts();
  });
}

// Initial load
loadSettings();

// Watch for new posts
const observer = new MutationObserver((mutations) => {
  console.log('LinkedIn Filter - DOM changed, filtering posts');
  filterPosts();
});

// Start observing
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Listen for settings changes
chrome.storage.onChanged.addListener((changes) => {
  console.log('LinkedIn Filter - Storage changed:', changes);
  if (changes.preferences) {
    preferences = changes.preferences.newValue;
  }
  if (changes.keywords) {
    keywords = changes.keywords.newValue;
  }
  filterPosts();
});