import { FC, useEffect, useState } from "react"
import { AppContentProps } from "../interfaces/globalProps"
import styled from "styled-components"
import { colorsVariables } from "../style/variables"

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

    const Style = styled.div`
        display:flex;
        flex-direction:column;
        padding:.5rem;
        background:${colorsVariables.color4};
        border-radius:.5rem;
        box-shadow:0 0 .3rem ${colorsVariables.color4};
        border:solid .1rem ${colorsVariables.color3_dark};
    `

    return (
        <Style className="summaryComponent">
            {/* <p>{summary}</p> */}
            test
            <ul>
                <li>test</li>
                <li>test</li>
                <li>test</li>
                <li>test</li>
                <li>test</li>
            </ul>
        </Style>
    )
}

export default SummaryComponent