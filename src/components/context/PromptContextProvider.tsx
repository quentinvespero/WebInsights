import { createContext, Dispatch, FC, SetStateAction, useContext } from "react"
import { ContextProviderProps } from "../../interfaces/globalProps"
import { AppContentContext } from "./AppContentContextProvider"
import { PromptSuggestionInterface } from "../../interfaces/appContentInterfaces"
import { GlobalContext } from "./ContextProvider"

interface PromptsProps {
    promptId:number
    setPromptId:Dispatch<SetStateAction<number>>
    promptText:PromptSuggestionInterface['prompt']
}

const PromptContext = createContext<PromptsProps>({
    promptId: 0,
    setPromptId: () => 0,
    promptText:''
})

const PromptProvider: FC<ContextProviderProps> =  ({children}) => {

    const {appContent} = useContext(AppContentContext)

    const {promptId,setPromptId} = useContext(GlobalContext)

    if (appContent === undefined || promptId === undefined || setPromptId === undefined){
        console.warn('appContent or global contexts seem not accessible..')
        return null
    }

    // keeping track of the selected prompt based on its ID
    // const [promptId, setPromptId] = useState<PromptsProps['promptId']>(0)

    const promptText = appContent?.prompts?.promptsSuggestions?.[promptId]?.prompt || 'turlututu'

    // console.log('-------- prompt context :',promptText)

    return (
        <PromptContext.Provider value={{promptId, setPromptId, promptText}}>
            {children}
        </PromptContext.Provider>
    )
}

export {PromptContext,PromptProvider}