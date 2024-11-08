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

    const basePrompt = appContent.prompts.basePrompt

    const endPrompt = 'Here is the webpage :'

    const {promptId,setPromptId} = useContext(GlobalContext)

    if (appContent === undefined || promptId === undefined || setPromptId === undefined){
        console.warn('----- PromptContextProvider.tsx -----','appContent or global contexts seem not accessible..')
        return null
    }

    // keeping track of the selected prompt based on its ID
    // const [promptId, setPromptId] = useState<PromptsProps['promptId']>(0)

    // the prompt that will be used, with the base prompt, that set up the key points of the instructions, 
    // followed by the "tone" selected in the app, that is more about the tone used to provide the answer
    // const promptText = basePrompt + ' ' + appContent?.prompts?.promptsSuggestions?.[promptId]?.prompt
    const promptText = basePrompt + ' ' + appContent?.prompts?.promptsSuggestions?.[promptId]?.prompt + endPrompt

    // console.log('-------- prompt context :',promptText)

    return (
        <PromptContext.Provider value={{promptId, setPromptId, promptText}}>
            {children}
        </PromptContext.Provider>
    )
}

export {PromptContext,PromptProvider}