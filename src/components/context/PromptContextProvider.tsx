import { createContext, Dispatch, FC, SetStateAction, useContext, useState } from "react"
import { AppContentProps, ContextProviderProps } from "../../interfaces/globalProps"
import { AppContentContext } from "./AppContentContextProvider"
import { PromptSuggestionInterface } from "../../interfaces/appContentInterfaces"

interface PromptsProps {
    promptId:number
    setPromptId:Dispatch<SetStateAction<number>>
    promptText:string
}

const PromptContext = createContext<PromptsProps>({
    promptId: 0,
    setPromptId: () => 0,
    promptText:''
})

const PromptProvider: FC<ContextProviderProps> =  ({children}) => {

    const {appContent} = useContext(AppContentContext)
    
    // keeping track of the selected prompt based on its ID
    const [promptId, setPromptId] = useState<PromptsProps['promptId']>(0)

    const promptText = appContent.prompts[promptId as keyof PromptSuggestionInterface['id']]

    return (
        <PromptContext.Provider value={{promptId, setPromptId}}>
            {children}
        </PromptContext.Provider>
    )
}