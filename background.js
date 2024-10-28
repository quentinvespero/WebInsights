chrome.action.onClicked.addListener((tab) => {
    // When the extension icon is clicked, send a message to the active tab
    chrome.tabs.sendMessage(tab.id, { action: 'startSummary' })
})