import { createContext, Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { ContextProviderProps } from "../../interfaces/globalProps";

interface LanguageProps {
    language: string
    setLanguage: Dispatch<SetStateAction<string>>
}

interface LanguageContextProps {
    savingSetting:(settingId:string, settingValue:string) => void
}

const LanguageContext = createContext<LanguageProps & LanguageContextProps>({
    language:'en',
    setLanguage:() => '',
    savingSetting:() => {}
})

const LanguageContextProvider:FC<ContextProviderProps> = ({children}) => {
    // keeping track of the language currently used in the app
    const [language, setLanguage] = useState<LanguageProps['language']>("en")

    // retrieving a possibly stored setting for language
    useEffect(() => {

        // checking whether chrome object is accessible or not
        if (typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.sync.get(['language'], (result) => {
                if (result.language) {
                    setLanguage(result.language)
                    console.log('a language setting has been restored from chrome storage')
                }
            })
        }
        // else console.warn('chrome.storage is not available in the current environment')
    }, [])

    // function to set up the default prompt in state and sync it with chrome memory
    const savingSetting = (settingItemId:string, settingValue:string) => {
        setLanguage(settingValue as string)
        saveToChrome(settingItemId,settingValue)
        console.log('setting saved :',settingItemId,settingValue)
    }

    // saving the setting to chrome if chrome is available
    const saveToChrome = (settingItemId:string, settingValue:string|number) => {
        if (chrome !== undefined && chrome.storage && chrome.storage.sync) {
            chrome.storage.sync.set({ [settingItemId]: settingValue })
            console.log(`${settingItemId} saved:`, settingValue)
        }
    }

    return (
        <LanguageContext.Provider value={{language, setLanguage, savingSetting}}>
            {children}
        </LanguageContext.Provider>
    )
}

export {LanguageContextProvider, LanguageContext}