import { useContext } from "react"
import { ApiKeyContext } from "../components/context/ApiKeyContextProvider"

export const useFetchSummary = () => {
    const apiKey = useContext(ApiKeyContext).apiKeyState

    // ensure that the provided api key isn't empty
    if (!apiKey || apiKey.length < 5) {
        throw new Error('----- useFetchSummary.ts ----- : the api key seem shorter than expected OR non-existent...')
    }

    const fetchSummary = async (dataToSendToAPI: string, apiKey:string): Promise<{ summary: string }> => {

        console.log('----- useFetchSummary -----','performing API request..')

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
    
    return fetchSummary
}

export const fetchSummary = async (apiKey:string, dataToSendToAPI: string): Promise<{ summary: string }> => {

    console.log('----- useFetchSummary -----','performing API request..')
    console.log('----- useFetchSummary -----','datatosendtoapi :',dataToSendToAPI.slice(0,700))

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