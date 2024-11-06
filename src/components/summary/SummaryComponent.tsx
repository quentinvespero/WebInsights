import { Suspense, useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { colorsVariables } from "../../style/variables"
import { PromptContext } from "../context/PromptContextProvider"
import { fetchSummary } from "../../hooks/useFetchSummary"
import { ApiContext } from "../context/ApiContextProvider"
import FallbackLoading from "../fallbackComponents/FallbackLoading"

const Style = styled.div`
    display:flex;
    flex-direction:column;
    padding:.5rem;
    background:${colorsVariables.color4};
    border-radius:.5rem;
    box-shadow:0 0 .3rem ${colorsVariables.color4};
    border:solid .1rem ${colorsVariables.color3_dark};
`

const SummaryComponent = () => {
    
    // ensuring the apikey is valid (by checking its length mostly)
    const { isValidApiKey, apiKeyState } = useContext(ApiContext)
    
    // the summary text to be rendered in the component
    const [summary, setSummary] = useState<string>('')
    
    // prompt that will be used, gathered from PromptContext
    const prompt = useContext(PromptContext).promptText
    
    useEffect(() => {
        // extracting the text of the webpage when NOT in chrome environment (for dev purpose)
        const extractedText = document.body.innerText

        const isInChromeEnvironment = typeof chrome !== 'undefined' && chrome.runtime && chrome.storage
        
        let dataToSendToAPI = `${prompt} ${extractedText}`

        if (isValidApiKey()) {
            if (isInChromeEnvironment){
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    chrome.scripting.executeScript(
                        {
                            target: { tabId: tabs[0].id! },
                            func: () => document.body.innerText
                        },
                        async (results) => {
                            try {
                                dataToSendToAPI = `${prompt} ${results[0].result as string}`
                            }
                            catch (error) {
                                console.error('failed to fetch summary', error)
                            }
                        }
                    )
                })
            }
            else console.log('----- SummaryComponent.tsx -----','dev env detected : the text used for the summary will be the current text of the app')
    
            fetchSummary(apiKeyState,dataToSendToAPI)
                .then(response => setSummary(response.summary))
                .catch(error => console.error('failed to fetch summary', error))
        }
        else console.warn('----- SummaryComponent.tsx -----', 'API key seem unvalid or missing')

    }, [prompt, apiKeyState])

    // calling useFetchSummary that will make a request to the API
    // const fetchSummaryFromApi = useFetchSummary()
    
    
    // if (loading || !isValidApiKey()) {
    //     // throw new Error('Invalid or missing API key')
    //     console.warn('invalid or missing api key')
    //     return
    // }

    return (
        <Style className="summaryComponent">
            <Suspense fallback={<FallbackLoading/>}>
                <p>{summary}</p>
            </Suspense>
            {/* <ul>
                <li>test</li>
                <li>test</li>
                <li>test</li>
            </ul> */}
        </Style>
    )
}

export default SummaryComponent