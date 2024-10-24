import { createContext, Dispatch, FC, ReactNode, SetStateAction, useEffect, useState } from "react"

interface ContextProviderProps {
    children:ReactNode
}

interface LanguageProps {
    language: string
    setLanguage: Dispatch<SetStateAction<string>>
}

interface PromptsProps {
    promptId:number
    setPromptId:Dispatch<SetStateAction<number>>
}

// interface ApiKeyProps {
//     personalApiKey: string
//     setPersonalApiKey:Dispatch<SetStateAction<string>>
// }

// creating the context, giving it the types for the useStates
// leaving the default value undefined because it will be given afterward by the default values of the useState below
const GlobalContext = createContext<LanguageProps & PromptsProps | undefined>(undefined)

const ContextProvider: FC<ContextProviderProps> = ({ children }) => {

    // keeping track of the language currently used in the app
    const [language, setLanguage] = useState<LanguageProps['language']>("en")
    
    // keeping track of the selected prompt based on its ID
    const [promptId, setPromptId] = useState<PromptsProps['promptId']>(0)

    // keeping track of the API key
    // const [personalApiKey, setPersonalApiKey] = useState<string>('')

    // retrieving a possibly stored setting for the language
    useEffect(() => {

        // checking whether chrome object is accessible or not
        if (typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.sync.get('language', (result) => {
                if (result.language) setLanguage(result.language)
            })
            chrome.storage.sync.get('prompt', (result) => {
                if (result.prompt) setPromptId(result.prompt)
            })
        }
        else console.warn('chrome.storage is not available in the current environment')
    }, [])

    return (
        // using the context previously created, passing the values that we want to use in this context
        <GlobalContext.Provider value={{language,setLanguage, promptId,setPromptId}}>
            {children}
        </GlobalContext.Provider>
    )
}

export {ContextProvider, GlobalContext}