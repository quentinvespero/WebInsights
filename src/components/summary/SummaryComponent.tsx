import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { colorsVariables } from "../../style/variables"
import { ApiContext } from "../context/ApiContextProvider"
import { PromptContext } from "../context/PromptContextProvider"

const Style = styled.div`
    display:flex;
    flex-direction:column;
    padding:.5rem;
    background:${colorsVariables.color4};
    border-radius:.5rem;
    box-shadow:0 0 .3rem ${colorsVariables.color4};
    border:solid .1rem ${colorsVariables.color3_dark};
`

// sending the content of the webpage to the API
const fetchSummary = async (apiKey:string, dataToSendToAPI: string): Promise<{ summary: string }> => {

    // console.log('apikey in fetchSummary function :',apiKey)

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: 'Summarize the following webpage content.' },
                { role: 'user', content: dataToSendToAPI }
            ],
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

const SummaryComponent = () => {

    // summary, which is the response from the API
    const [summary, setSummary] = useState<string>('')

    const prompt = useContext(PromptContext).promptText
    const apiKey = useContext(ApiContext).apiKeyState

    // console.log(prompt)

    useEffect(() => {
        if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage.addListener ) {

            // it listens to get a possible message 'startSummary' from the script
            chrome.runtime.onMessage.addListener((request) => {
                if (request.action === 'startSummary') {

                    console.log('startSummary message received')

                    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                        
                        // Run extractText in the tab's context to get the page's text
                        chrome.scripting.executeScript(
                            {
                                target: { tabId: tabs[0].id! },
                                func: extractText
                            },
                            async (results) => {
                                const extractedText = results[0].result as string
                                const dataToSendToAPI = `${prompt} ${extractedText}` 
                                const apiDataResponse = await fetchSummary(apiKey,dataToSendToAPI)
                                setSummary(apiDataResponse.summary)
                            }
                        )
                    })
                }
            })
        }
        else {
            // console.warn('chrome is not available in the current environment')
            const extractedText = "Hello here is a dummy text to be summarised about the monkey in the zoo that can't stop making fun of the people walking around and watching him"
            const dataToSendToAPI = `${prompt} ${extractedText}`
            
            console.log(dataToSendToAPI)
            
            // async function to handle the API call
            const apiFetch = async () => {
                const apiDataResponse = await fetchSummary(apiKey,dataToSendToAPI)
                setSummary(apiDataResponse.summary)
            }
            
            apiFetch()
        }
    }, [])

    return (
        <Style className="summaryComponent">
            <p>{summary}</p>
            <ul>
                <li>test</li>
                <li>test</li>
                <li>test</li>
            </ul>
        </Style>
    )
}

export default SummaryComponent