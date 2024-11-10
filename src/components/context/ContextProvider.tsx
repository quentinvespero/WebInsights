import { createContext, FC, useContext } from "react"
import { ContextProviderProps } from "../../interfaces/globalProps"
import { AppContentContext } from "./AppContentContextProvider"
import { PromptContext } from "./PromptContextProvider"

interface GlobalContextProps{
    savingSettingV2:(settingName:string, settingId:number) => void
}

// creating the context, giving it the types for the useStates
// leaving the default value undefined because it will be given afterward by the default values of the useState below
const GlobalContext = createContext<GlobalContextProps>({
    savingSettingV2: () => {}
})

const ContextProvider: FC<ContextProviderProps> = ({ children }) => {

    const {setLanguageV2} = useContext(AppContentContext)
    const {setPromptId} = useContext(PromptContext)

    const savingSettingV2 = (settingName:string, settingId:number):void => {
        switch (settingName) {
            case 'language':
                setLanguageV2(settingId)
                console.log('----- ContextProvider.tsx - savingSettingV2 -----','setting saved :',settingName,settingId)
                break
            case 'defaultPrompt':
                setPromptId(settingId)
                console.log('----- ContextProvider.tsx - savingSettingV2 -----','setting saved :',settingName,settingId)
                break
            default:
                console.warn('----- ContextProvider.tsx - savingSettingV2 -----',`Unhandled setting type: ${settingName}`)
                break
        }
        saveToChromeV2(settingName,settingId)
    }

    const saveToChromeV2 = (settingName:string, settingId:number) => {
        if (chrome !== undefined && chrome.storage && chrome.storage.sync) {
            chrome.storage.sync.set({ [settingName]: settingId })
            console.log('----- ContextProvider.tsx - saveToChromeV2 -----',`${settingName} saved:`, settingId)
        }
        else console.warn('----- ContextProvider.tsx - saveToChromeV2 -----',`${settingName} not saved in chrome memory:`, settingId)
    }

    return (
        // using the context previously created, passing the values that we want to use in this context
        <GlobalContext.Provider value={{savingSettingV2}}>
            {children}
        </GlobalContext.Provider>
    )
}

export {ContextProvider, GlobalContext}