import { FC, useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { colorsVariables } from "../../style/variables"
import { ToneOptionInterface } from "../../interfaces/appContentInterfaces"
import { ApiContext } from "../context/ApiContextProvider"
import { GlobalContext } from "../context/ContextProvider"

// interface SummaryComponentProps {
//     prompt: ToneOptionInterface['prompt']
// }

const Style = styled.div`
    display:flex;
    flex-direction:column;
    padding:.5rem;
    background:${colorsVariables.color4};
    border-radius:.5rem;
    box-shadow:0 0 .3rem ${colorsVariables.color4};
    border:solid .1rem ${colorsVariables.color3_dark};
`

const {apiKeyState} = useContext(ApiContext)

const {} = useContext(GlobalContext)

// sending the content of the webpage to the API
const fetchSummary = async (dataToSendToAPI: string): Promise<{ summary: string }> => {

    // getting the api key from local storage
    // const { apiKey } = await new Promise<{ apiKey: string }>((resolve) => {
    //     chrome.storage.local.get('apiKey', (result) => resolve({ apiKey: result.apiKey }))
    // })

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKeyState}`
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

    const [summary, setSummary] = useState<string>('')

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
                                const apiDataResponse = await fetchSummary(dataToSendToAPI)
                                setSummary(apiDataResponse.summary)
                            }
                        )
                    })
                }
            })
        }
        else {
            console.warn('chrome is not available in the current environment')
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