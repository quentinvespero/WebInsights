import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { colorsVariables } from "../../style/variables"
import { PromptContext } from "../context/PromptContextProvider"
import { useFetchSummary } from "../../hooks/useFetchSummary"
// import { addChromeListener } from "../../utils/chromeUtils"
import { ApiContext } from "../context/ApiContextProvider"

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
    const { isValidApiKey, loading } = useContext(ApiContext)

    // the summary text to be rendered in the component
    const [summary, setSummary] = useState<string>('')
    
    // prompt that will be used, gathered from PromptContext
    const prompt = useContext(PromptContext).promptText


    // extracting the text of the webpage when NOT in chrome environment (for dev purpose)
    const extractedText = document.body.innerText

    // if (loading) {
    //     return <div className="loading">loading</div>
    // }
    
    useEffect(() => {

        if (!isValidApiKey()) {
            // throw new Error('Invalid or missing API key')
            console.warn('invalid or missing api key')
            return
        }

        // calling useFetchSummary that will make a request to the API
        const fetchSummaryFromApi = useFetchSummary()

        const isInChromeEnvironment = typeof chrome !== 'undefined' && chrome.runtime && chrome.storage

        if (isInChromeEnvironment){
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.scripting.executeScript(
                    {
                        target: { tabId: tabs[0].id! },
                        func: () => document.body.innerText
                    },
                    async (results) => {
                        const extractedText = results[0].result as string
                        const dataToSendToAPI = `${prompt} ${extractedText}`
                        const apiDataResponse = await fetchSummaryFromApi(dataToSendToAPI)
                        setSummary(apiDataResponse.summary)
                    }
                )
            })
            // addChromeListener(async (extractedText) => {
            //     const dataToSendToAPI = `${prompt} ${extractedText}`
            //     const apiDataResponse = await fetchSummaryFromApi(dataToSendToAPI)
            //     setSummary(apiDataResponse.summary)
            // })
        }
        else {
            console.log('turlututu----------------------------------')
            const dataToSendToAPI = `${prompt} ${extractedText}`
            fetchSummaryFromApi(dataToSendToAPI).then(response => setSummary(response.summary))
        }
    }, [prompt, isValidApiKey, loading])

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