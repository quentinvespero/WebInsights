import { useContext } from "react"
import { ApiContext } from "../components/context/ApiContextProvider"

export const useFetchSummary = () => {
    const apiKey = useContext(ApiContext).apiKeyState

    // ensure that the provided api key isn't empty
    if (!apiKey || apiKey.length < 5) {
        throw new Error('----- useFetchSummary.ts ----- : the api key seem shorter than expected OR non-existent...')
    }

    const fetchSummary = async (dataToSendToAPI: string): Promise<{ summary: string }> => {

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