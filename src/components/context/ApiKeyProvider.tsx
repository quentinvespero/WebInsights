import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from "react"

interface ContextProviderProps {
    children:ReactNode
}

interface ApiKeyProps {
    personalApiKey: string
    setPersonalApiKey:Dispatch<SetStateAction<string>>
}

// creating the context, giving it the types for the useStates
// leaving the default value undefined because it will be given afterward by the default values of the useState below
const ApiContext = createContext<ApiKeyProps | undefined>(undefined)

const ApiContextProvider: FC<ContextProviderProps> = ({ children }) => {

    // keeping track of the API key
    const [personalApiKey, setPersonalApiKey] = useState<string>('')

    return (
        // using the context previously created, passing the values that we want to use in this context
        <ApiContext.Provider value={{personalApiKey,setPersonalApiKey}}>
            {children}
        </ApiContext.Provider>
    )
}

export {ApiContextProvider, ApiContext}