import { createContext, FC, useEffect, useState } from "react"
import { ContextProviderProps } from "../../interfaces/globalProps"

interface ApiKeyProps {
    apiKeyState:string
    partialApiKey:string
    settingUpApiKey:(apiKey:string, callback:()=> void) => void
    isValidApiKey: () => boolean,
    loadingApiKey:boolean
}

// creating the context, giving it the types for the useStates
// leaving the default value undefined because it will be given afterward by the default values of the useState below
const ApiKeyContext = createContext<ApiKeyProps>({
    apiKeyState:'',
    partialApiKey:'',
    settingUpApiKey:() => {},
    isValidApiKey: () => false,
    loadingApiKey:true
})

const ApiKeyContextProvider: FC<ContextProviderProps> = ({ children }) => {

    // keeping track of the API key
    const [apiKeyState, setApiKeyState] = useState<string>('')

    // state for keeping track of whether the api key is being load or not
    const [loadingApiKey, setLoadingApiKey] = useState<boolean>(true)

    // part of the api key, to avoid having to provide the whole key
    let partialApiKey:string = '***' + apiKeyState.slice(-5)

    // validation function to check if the API key is valid
    // the default value for apiKey is set on the value of apiKeyState
    const isValidApiKey = (key: string = apiKeyState): boolean => {
        return !!key && key.length >= 10
    }

    // function to set the API key in both the useState and chrome local storage
    const settingUpApiKey = (apiKey: string, callback:() => void):void => {
        
        if (!isValidApiKey(apiKey)) {
            console.error('----- ApiKeyContextProvider.tsx -----','Invalid API key format')
            return
        }

        setApiKeyState(apiKey)

        // console.log('saving key in state :',apiKey)

        if (chrome?.storage?.local){
            chrome.storage.local.set(
                { apiKey: apiKey }, 
                () => {
                    if (!chrome.runtime.lastError) {
                        console.log('API key saved successfully')
                        callback()  // Run the callback on successful save
                    }
                    else console.error(chrome.runtime.lastError)
                }
            )
        }
        else console.warn('----- ApiKeyContextProvider.tsx -----','not in chrome env it seems')
    }

    // loading the apiKey from the chrome local storage
    useEffect(() => {
        if (apiKeyState === '' && chrome?.storage?.local){
            chrome.storage.local.get(['apiKey'], (result) => {
                if (result.apiKey) {
                    setApiKeyState(result.apiKey)
                    console.log('----- ApiKeyContextProvider.tsx -----','an api key have been restored from chrome storage')
                }
                setLoadingApiKey(false)
            })
        }
        else setLoadingApiKey(false) // directly set it up to false because no need to get the key from the chrome storage
    }, [])

    return (
        // using the context previously created, passing the values that we want to use in this context
        <ApiKeyContext.Provider value={{partialApiKey,settingUpApiKey, apiKeyState, isValidApiKey, loadingApiKey}}>
            {children}
        </ApiKeyContext.Provider>
    )
}

export {ApiKeyContext, ApiKeyContextProvider}