import { createContext, FC, ReactNode, useState } from "react"
import { LanguageProps, PromptsProps } from "../../interfaces/globalProps"

interface ContextProviderProps {
    children:ReactNode
}

// creating the context, giving it the types for the useStates
// leaving the default value undefined because it will be given afterward by the default values of the useState below
const GlobalContext = createContext<LanguageProps & PromptsProps| undefined>(undefined)

const ContextProvider: FC<ContextProviderProps> = ({ children }) => {

    // keeping track of the language currently used in the app
    const [language, setLanguage] = useState<LanguageProps['language']>("en")
    
    // keeping track of the selected prompt based on its ID
    const [promptId, setPromptId] = useState<PromptsProps['promptId']>(0)

    return (
        // using the context previously created, passing the values that we want to use in this context
        <GlobalContext.Provider value={{language,setLanguage,promptId,setPromptId}}>
            {children}
        </GlobalContext.Provider>
    )
}

export {ContextProvider, GlobalContext}