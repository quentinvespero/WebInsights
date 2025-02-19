let selectedText: string | null = null
let selectedElement: HTMLElement | null = null

document.addEventListener('mouseup', () => {
    selectedText = window.getSelection()?.toString() || null
    selectedElement = window.getSelection()?.anchorNode?.parentElement || null
})

chrome.runtime.onMessage.addListener(async (message) => {
    if (message.type === 'TRANSLATE_SELECTION' && selectedText && selectedElement) {
        const settings = await chrome.storage.sync.get('translationLanguage')
        const targetLang = settings.translationLanguage || 'en'

        try {
            // Replace this with your preferred translation API
            const response = await fetch('https://translation-api.example.com', {
                method: 'POST',
                body: JSON.stringify({
                    text: selectedText,
                    targetLang
                })
            })
            const translatedText = await response.json()

            const currentText = selectedElement.textContent || ''
            selectedElement.textContent = currentText.replace(
                selectedText,
                translatedText
            )
        } catch (error) {
            console.error('Translation failed:', error)
        }
    }
})