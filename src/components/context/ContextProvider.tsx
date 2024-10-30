import { createContext, Dispatch, FC, ReactNode, SetStateAction, useEffect, useState } from "react"

interface ContextProviderProps {
    children:ReactNode
}

interface GlobalContextProps{
    savingSetting:(settingId:string, settingValue:string|number) => void
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
const GlobalContext = createContext<LanguageProps & PromptsProps & GlobalContextProps | undefined>(undefined)

const ContextProvider: FC<ContextProviderProps> = ({ children }) => {

    // keeping track of the language currently used in the app
    const [language, setLanguage] = useState<LanguageProps['language']>("en")
    
    // keeping track of the selected prompt based on its ID
    const [promptId, setPromptId] = useState<PromptsProps['promptId']>(0)

    // retrieving a possibly stored setting for the language
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

    // function to set up the default prompt and sync it with chrome memory
    // const settingUpDefaultPrompt = (promptId:number) => {
    //         setPromptId(promptId)
    //         saveToChrome()
    // }
            
    // function to set up the default prompt in state and sync it with chrome memory
    const savingSetting = (settingItemId:string, settingValue:string|number) => {
        switch (settingItemId) {
            case 'language':
                setLanguage(settingValue as string)
                saveToChrome(settingItemId,settingValue)
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

    // saving the setting to chrome if chrome is available
    const saveToChrome = (settingItemId:string, settingValue:string|number) => {
        if (chrome !== undefined && chrome.storage && chrome.storage.sync) {
            chrome.storage.sync.set({ [settingItemId]: settingValue })
            console.log(`${settingItemId} saved:`, settingValue)
        }
    }

    return (
        // using the context previously created, passing the values that we want to use in this context
        <GlobalContext.Provider value={{language,setLanguage, promptId,setPromptId, savingSetting}}>
            {children}
        </GlobalContext.Provider>
    )
}

export {ContextProvider, GlobalContext}