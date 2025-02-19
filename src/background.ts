chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'translate-selection',
    title: 'Translate selection',
    contexts: ['selection']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'translate-selection' && tab?.id) {
    chrome.tabs.sendMessage(tab.id, {
      type: 'TRANSLATE_SELECTION',
      text: info.selectionText
    });
  }
});