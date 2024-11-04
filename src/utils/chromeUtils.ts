export const addChromeListener = (callback: (text: string) => void) => {
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage.addListener) {
        chrome.runtime.onMessage.addListener((request) => {
            if (request.action === 'startSummary') {
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    chrome.scripting.executeScript(
                        {
                            target: { tabId: tabs[0].id! },
                            func: () => document.body.innerText
                        },
                        (results) => callback(results[0].result as string)
                    )
                })
            }
        })
    }
    else console.warn('----- chromeUtils -----','not in chrome environment')
}