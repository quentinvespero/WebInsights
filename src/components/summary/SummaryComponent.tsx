import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { colorsVariables } from "../../style/variables"
import { PromptContext } from "../context/PromptContextProvider"
import { useFetchSummary } from "../../hooks/useFetchSummary"
import { addChromeListener } from "../../utils/chromeUtils"
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

    // the summary text to be rendered in the component
    const [summary, setSummary] = useState<string>('')
    
    // calling useFetchSummary that will make a request to the API
    const fetchSummaryFromApi = useFetchSummary()
    
    // prompt that will be used, gathered from PromptContext
    const prompt = useContext(PromptContext).promptText

    // ensuring the apikey is valid (by checking its length mostly)
    const { isValidApiKey } = useContext(ApiContext)

    // extracting the text of the webpage when NOT in chrome environment
    const extractedText = document.body.innerText

    useEffect(() => {
        if (!isValidApiKey()) throw new Error('Invalid or missing API key')

        const isInChromeEnvironment = typeof chrome !== 'undefined' && chrome.runtime && chrome.storage

        if (isInChromeEnvironment){
            addChromeListener(async (extractedText) => {
                const dataToSendToAPI = `${prompt} ${extractedText}`
                const apiDataResponse = await fetchSummaryFromApi(dataToSendToAPI)
                setSummary(apiDataResponse.summary)
            })
        }
        else {
            console.log('turlututu----------------------------------')
            const dataToSendToAPI = `${prompt} ${extractedText}`
            fetchSummaryFromApi(dataToSendToAPI).then(response => setSummary(response.summary))
        }
    }, [fetchSummaryFromApi, prompt, isValidApiKey])

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