import { FC, useEffect, useState } from "react"
import { AppContentProps } from "../interfaces/globalProps"

interface SummaryComponentProps {
    prompt: string
}

// sending the content of the webpage to the API
const fetchSummary = async (textToSendToAPI: string): Promise<{ summary: string }> => {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: textToSendToAPI }],
            max_tokens: 100
        })
    })
    
    const apiDataResponse = await response.json()

    return { summary: apiDataResponse.choices[0].message.content }
}

// grab the text of the webpage
const extractText = (): string => {
    return document.body.innerText
}

const SummaryComponent:FC<SummaryComponentProps> = ({prompt}) => {

    const [summary, setSummary] = useState<string>('')

    useEffect(() => {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action === 'startSummary') {
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    
                    // Run extractText in the tab's context to get the page's text
                    chrome.scripting.executeScript(
                        {
                            target: { tabId: tabs[0].id! },
                            func: extractText
                        },
                        async (results) => {
                            const extractedText = results[0].result as string
                            const textToSendToAPI = `${prompt} ${extractedText}` // Add textToSendToAPI to the text
                            const apiDataResponse = await fetchSummary(textToSendToAPI)  // Fetch the summary from the API
                            setSummary(apiDataResponse.summary)  // Set the summary in state
                        }
                    )
                })
            }
        })
    }, [])

    return (
        <div>
            <p>{summary}</p>
            test
        </div>
    )
}

export default SummaryComponent
