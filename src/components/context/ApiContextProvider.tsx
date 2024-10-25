import { createContext, FC, ReactNode, useEffect, useState } from "react"

interface ContextProviderProps {
    children:ReactNode
}

interface ApiKeyProps {
    apiKeyState: string
    settingUpApiKey:(apiKey:string) => void
}

// creating the context, giving it the types for the useStates
// leaving the default value undefined because it will be given afterward by the default values of the useState below
const ApiContext = createContext<ApiKeyProps | undefined>(undefined)

const ApiContextProvider: FC<ContextProviderProps> = ({ children }) => {

    // keeping track of the API key
    const [apiKeyState, setApiKeyState] = useState<string>('')

    // function to set the API key in both the useState and chrome local storage
    const settingUpApiKey = (apiKey: string) => {
        
        setApiKeyState(apiKey)

        if (chrome !== undefined && chrome.storage && chrome.storage.local){
            chrome.storage.local.set({ apiKey: apiKey })
        }
    }

    // loading the apiKey from the chrome local storage
    useEffect(() => {
        if (apiKeyState === ''){
            if (chrome !== undefined && chrome.storage && chrome.storage.local){
                chrome.storage.local.get(['apiKey'], (result) => {
                    if (result.apiKey) {
                        setApiKeyState(result.apiKey)
                        console.log(result.apiKey)
                    }
                })
            }
        }
    }, [])

    return (
        // using the context previously created, passing the values that we want to use in this context
        <ApiContext.Provider value={{apiKeyState,settingUpApiKey}}>
            {children}
        </ApiContext.Provider>
    )
}

export {ApiContext, ApiContextProvider}