import { createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState } from "react"
import { ContextProviderProps } from "../../interfaces/globalProps"
import { SettingV2ItemValueInterface } from "./AppContentContextProvider"
import { PromptContext } from "./PromptContextProvider"

interface GlobalContextProps{
    savingSetting:(settingId:string, settingValue:string|number) => void
    savingSettingV2:(settingV2ItemId:string, settingV2ItemValue:SettingV2ItemValueInterface, callback:() => void) => void
}

interface LanguageProps {
    language: string
    setLanguage: Dispatch<SetStateAction<string>>
}
interface LanguagePropsV2 {
    languageV2: number
    setLanguageV2: Dispatch<SetStateAction<number>>
}

interface PromptsProps {
    promptId:number
    setPromptId:Dispatch<SetStateAction<number>>
}

// creating the context, giving it the types for the useStates
// leaving the default value undefined because it will be given afterward by the default values of the useState below
const GlobalContext = createContext<LanguageProps & LanguagePropsV2 & PromptsProps & GlobalContextProps>({
    language: 'en',
    setLanguage: () => '',
    promptId: 0,
    setPromptId: () => 0,
    savingSetting: () => {},
    languageV2: 0,
    setLanguageV2: () => '',
    savingSettingV2: () => {}
})

// ------------------------------------------
// ------------------------------------------
// DEPRECATED context : will be split into LanguageContextProvider and PromptContextProvider
// ------------------------------------------
// ------------------------------------------
const ContextProvider: FC<ContextProviderProps> = ({ children }) => {

    // keeping track of the language currently used in the app
    const [language, setLanguage] = useState<LanguageProps['language']>("en")

    // setting up language V2, that will use the id of type number instead of the string
    const [languageV2, setLanguageV2] = useState<LanguagePropsV2['languageV2']>(0)
    
    // keeping track of the selected prompt based on its ID
    // const [promptId, setPromptId] = useState<PromptsProps['promptId']>(0)
    const {promptId, setPromptId} = useContext(PromptContext)

    // retrieving a possibly stored setting for language or prompt
    useEffect(() => {

        // checking whether chrome object is accessible or not
        if (typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.sync.get(['language'], (result) => {
                if (result.language) {
                    setLanguage(result.language)
                    console.log('a language setting has been restored from chrome storage')
                }
            })
            chrome.storage.sync.get(['defaultPrompt'], (result) => {
                if (result.defaultPrompt) {
                    setPromptId(result.defaultPrompt)
                    console.log('a default prompt has been restored from chrome storage')
                }
            })
        }
        // else console.warn('chrome.storage is not available in the current environment')
    }, [])
            
    // function to set up the default prompt in state and sync it with chrome memory
    const savingSetting = (settingItemId:string, settingValue:string|number) => {
        switch (settingItemId) {
            case 'language':
                setLanguage(settingValue as string)
                saveToChrome(settingItemId,settingValue)
                // savingToChromeStorage(settingItemId,settingValue, true)
                console.log('setting saved :',settingItemId,settingValue)
                break
            case 'defaultPrompt':
                setPromptId(settingValue as number)
                saveToChrome(settingItemId,settingValue)
                console.log('setting saved :',settingItemId,settingValue)
                break
            default:
                break
        }
    }
    // for settingsV2
    const savingSettingV2 = (settingV2ItemId:string, settingV2ItemValue:SettingV2ItemValueInterface, callback:() => void):void => {
        switch (settingV2ItemId) {
            case 'language':
                setLanguageV2(settingV2ItemValue.id)
                saveToChromeV2(settingV2ItemId,settingV2ItemValue.id)
                console.log('setting saved :',settingV2ItemId,settingV2ItemValue.id)
                callback()
                break
            case 'defaultPrompt':
                setPromptId(settingV2ItemValue.id)
                saveToChromeV2(settingV2ItemId,settingV2ItemValue.id)
                console.log('setting saved :',settingV2ItemId,settingV2ItemValue.id)
                callback()
                break
            default:
                break
        }
    }

    // saving the setting to chrome if chrome is available
    const saveToChrome = (settingItemId:string, settingValue:string|number) => {
        if (chrome !== undefined && chrome.storage && chrome.storage.sync) {
            chrome.storage.sync.set({ [settingItemId]: settingValue })
            console.log(`${settingItemId} saved:`, settingValue)
        }
    }
    // settingV2
    const saveToChromeV2 = (settingV2ItemId:string, settingV2ItemValueId:number) => {
        if (chrome !== undefined && chrome.storage && chrome.storage.sync) {
            chrome.storage.sync.set({ [settingV2ItemId]: settingV2ItemValueId })
            console.log(`${settingV2ItemId} saved:`, settingV2ItemValueId)
        }
    }

    return (
        // using the context previously created, passing the values that we want to use in this context
        <GlobalContext.Provider value={{language,setLanguage, promptId,setPromptId, savingSetting,savingSettingV2, languageV2, setLanguageV2}}>
            {children}
        </GlobalContext.Provider>
    )
}

export {ContextProvider, GlobalContext}