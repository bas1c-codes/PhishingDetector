// popup.js

document.addEventListener('DOMContentLoaded', function() {
    // 1. Elements to update
    const statusContainer = document.getElementById('statusContainer');
    const statusIcon = document.getElementById('statusIcon');
    const statusText = document.getElementById('statusText');
    const detailsList = document.querySelectorAll('.text-slate-600.font-semibold');

    // 2. Mock Data / Analysis Logic
    // In a real app, you'd use chrome.tabs.query to get the URL 
    // and then call your API or background script.
    async function analyzeCurrentSite() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const currentTab = tabs[0];
            const url = new URL(currentTab.url);
            const domain = url.hostname;

            // Simple demo logic: 
            // If the domain is very new or on a blacklist, trigger warning.
            if (domain.includes('xyz') || domain.includes('cheap-deals')) {
                updateUI('danger', domain);
            } else if (domain.includes('crypto')) {
                updateUI('warning', domain);
            } else {
                updateUI('safe', domain);
            }
        });
    }

    // 3. UI State Switcher
    function updateUI(state, domain) {
        switch (state) {
            case 'danger':
                statusContainer.className = 'bg-red-50 p-6 text-center transition-colors duration-500';
                statusIcon.className = 'mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-200 mb-4 animate-bounce';
                statusIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
                statusText.innerText = "High Risk Detected";
                statusText.className = "text-xl font-bold text-red-700";
                break;

            case 'warning':
                statusContainer.className = 'bg-yellow-50 p-6 text-center transition-colors duration-500';
                statusIcon.className = 'mx-auto w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-200 mb-4';
                statusIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
                statusText.innerText = "Suspicious Site";
                statusText.className = "text-xl font-bold text-yellow-700";
                break;

            case 'safe':
                // Keep default HTML styles
                break;
        }
    }

    // 4. Interaction Handlers
    document.getElementById('settingsBtn').addEventListener('click', () => {
        // Open the extension's options page
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL('options.html'));
        }
    });

    // Run analysis on popup open
    analyzeCurrentSite();
});