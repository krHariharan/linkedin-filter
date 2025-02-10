document.addEventListener('DOMContentLoaded', () => {
    console.log('LinkedIn Filter - Popup script loaded');
  
    // Tab switching
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.category-content').forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(`${tab.dataset.category}-content`).classList.add('active');
      });
    });
  
    // Load saved settings
    chrome.storage.sync.get(['preferences', 'keywords', 'filterCount'], (result) => {
      console.log('LinkedIn Filter - Settings retrieved:', result);
      const prefs = result.preferences || {
        jobsEnabled: true,
        researchEnabled: true,
        businessEnabled: true
      };
      
      const keywords = result.keywords || DEFAULT_KEYWORDS;
      
      // Set checkboxes
      document.getElementById('jobsEnabled').checked = prefs.jobsEnabled;
      document.getElementById('researchEnabled').checked = prefs.researchEnabled;
      document.getElementById('businessEnabled').checked = prefs.businessEnabled;
      
      // Set keywords
      document.getElementById('jobKeywords').value = keywords.job.join('\n');
      document.getElementById('researchKeywords').value = keywords.research.join('\n');
      document.getElementById('businessKeywords').value = keywords.business.join('\n');
      
      // Set filter count
      document.getElementById('filterCount').textContent = result.filterCount || 0;
    });
  
    // Save settings
    document.getElementById('saveSettings').addEventListener('click', () => {
      const preferences = {
        jobsEnabled: document.getElementById('jobsEnabled').checked,
        researchEnabled: document.getElementById('researchEnabled').checked,
        businessEnabled: document.getElementById('businessEnabled').checked
      };
      
      const keywords = {
        job: document.getElementById('jobKeywords').value.split('\n').filter(k => k.trim()),
        research: document.getElementById('researchKeywords').value.split('\n').filter(k => k.trim()),
        business: document.getElementById('businessKeywords').value.split('\n').filter(k => k.trim())
      };
      
      chrome.storage.sync.set({ preferences, keywords }, () => {
        console.log('LinkedIn Filter - Settings saved:', { preferences, keywords });
        alert('Settings saved!');
      });
    });
  });