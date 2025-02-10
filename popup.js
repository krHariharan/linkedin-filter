const DEFAULT_KEYWORDS = {
    job: [
      'hiring', 'job opening', 'position', 'career', 'opportunity', 'role', 
      'looking for', 'join our team', 'apply now', 'job post', 'vacancy',
      'recruiting', 'recruitment', 'job description', 'responsibilities',
      'qualifications', 'requirements', 'salary', 'remote work', 'hybrid'
    ],
    research: [
      'research', 'study', 'publication', 'paper', 'findings', 'analysis',
      'investigation', 'experiment', 'data', 'methodology', 'results',
      'collaboration', 'grant', 'funding', 'fellowship', 'PhD', 'postdoc',
      'laboratory', 'innovation', 'discovery', 'academic'
    ],
    business: [
      'partnership', 'investment', 'startup', 'venture', 'business opportunity',
      'collaboration', 'seeking', 'funding', 'investors', 'growth',
      'scale', 'market', 'revenue', 'clients', 'customers', 'b2b',
      'services', 'solution', 'product launch', 'expansion'
    ],
    clickbait: [
      'shocking', 'this will blow your mind', 'viral', 'watch till the end', 'breaking news',
      'mind-blowing', 'crazy', 'jaw-dropping', 'what do you think', 'what are your thoughts',
      'my thoughts'
    ]
  };

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
        businessEnabled: true,
        clickbaitEnabled: true
      };
      
      const keywords = result.keywords || DEFAULT_KEYWORDS;
      
      // Set checkboxes
      document.getElementById('jobsEnabled').checked = prefs.jobsEnabled;
      document.getElementById('researchEnabled').checked = prefs.researchEnabled;
      document.getElementById('businessEnabled').checked = prefs.businessEnabled;
      document.getElementById('businessEnabled').checked = prefs.clickbaitEnabled;
      
      // Set keywords
      document.getElementById('jobKeywords').value = keywords.job.join('\n');
      document.getElementById('researchKeywords').value = keywords.research.join('\n');
      document.getElementById('businessKeywords').value = keywords.business.join('\n');
      document.getElementById('clickbaitKeywords').value = keywords.clickbait.join('\n');
      
      // Set filter count
      document.getElementById('filterCount').textContent = result.filterCount || 0;
    });
  
    // Save settings
    document.getElementById('saveSettings').addEventListener('click', () => {
      const preferences = {
        jobsEnabled: document.getElementById('jobsEnabled').checked,
        researchEnabled: document.getElementById('researchEnabled').checked,
        businessEnabled: document.getElementById('businessEnabled').checked,
        clickbaitEnabled: document.getElementById('clickbaitEnabled').checked
      };
      
      const keywords = {
        job: document.getElementById('jobKeywords').value.split('\n').filter(k => k.trim()),
        research: document.getElementById('researchKeywords').value.split('\n').filter(k => k.trim()),
        business: document.getElementById('businessKeywords').value.split('\n').filter(k => k.trim()),
        clickbait: document.getElementById('clickbaitKeywords').value.split('\n').filter(k => k.trim())
      };
      
      chrome.storage.sync.set({ preferences, keywords }, () => {
        console.log('LinkedIn Filter - Settings saved:', { preferences, keywords });
        alert('Settings saved!');
      });
    });
  });