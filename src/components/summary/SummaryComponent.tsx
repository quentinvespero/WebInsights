import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { colorsVariables } from "../../style/variables"
import { PromptContext } from "../context/PromptContextProvider"
import { fetchSummary } from "../../hooks/useFetchSummary"
import { ApiContext } from "../context/ApiContextProvider"
import ReactMarkdown from 'react-markdown'

const Style = styled.div`
    /* display:flex;
    flex-direction:column;
    padding:1rem;
    background:${colorsVariables.color4};
    border-radius:.5rem;
    box-shadow:0 0 .3rem ${colorsVariables.color4};
    border:solid .1rem ${colorsVariables.color3_dark}; */
`

const SummaryComponent = () => {

    // ensuring the apikey is valid (by checking its length mostly)
    const { isValidApiKey, loadingApiKey, apiKeyState } = useContext(ApiContext)

    // the summary text to be rendered in the component
    const [summary, setSummary] = useState<string>('')

    // prompt that will be used, gathered from PromptContext
    const prompt = useContext(PromptContext).promptText

    // state for keeping track of whether it's loading the summary or not
    const [isSummaryLoading, setIsSummaryLoading] = useState<boolean>(false)

    useEffect(() => {
        // extracting the text of the webpage when NOT in chrome environment (for dev purpose)
        let extractedText = ''

        const isInChromeEnvironment = typeof chrome !== 'undefined' && chrome.runtime && chrome.storage

        // let dataToSendToAPI = `${prompt} ${extractedText}`

        const fetchAndSetSummary = async (extractedText: string) => {

            // Start loading state for summary fetch
            setIsSummaryLoading(true)
            
            try {
                // console.log('----- SummaryComponent.tsx -----', prompt)
                const apiResponse = await fetchSummary(apiKeyState, `${prompt} ${extractedText}`)
                setSummary(apiResponse.summary)
            }
            catch (error) {
                console.error('----- SummaryComponent.tsx -----','Failed to fetch summary:', error)
            }
            finally {
                setIsSummaryLoading(false)
            }
        }

        if (!loadingApiKey && isValidApiKey()) {
            if (isInChromeEnvironment) {
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    chrome.scripting.executeScript(
                        {
                            target: { tabId: tabs[0].id! },
                            func: () => document.body.innerText
                        },
                        (results) => {
                            extractedText = results?.[0]?.result || ''
                            fetchAndSetSummary(extractedText)
                        }
                    )
                })
            }
            else { // this case is for dev environment, outside of chrome extension use
                
                console.log('----- SummaryComponent.tsx -----', 'dev env detected : the text used for the summary will be a fake one')
                
                extractedText = 'this is a dummy text to be summarised, about the amount of cities that are tech friendly in 2024'
                
                fetchAndSetSummary(extractedText)
            }

        }
        else console.warn('----- SummaryComponent.tsx -----', 'API key seem unvalid or missing')

    }, [prompt, apiKeyState, loadingApiKey])

    // Use Suspense fallback if either API key or summary fetch is loading
    if (loadingApiKey || isSummaryLoading) {
        throw new Promise(() => {}) // Forces <Suspense> fallback
    }

    return (
        <Style className="summaryComponent">
            {!loadingApiKey
                ?
                <ReactMarkdown>{summary}</ReactMarkdown>
                :
                <p>loading...</p>
            }
        </Style>
    )
}

export default SummaryComponent