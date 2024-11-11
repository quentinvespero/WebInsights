import { createContext, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import content from '../../../public/assets/content.json'
import { ContextProviderProps } from '../../interfaces/globalProps'

interface AppContentInterface {
    title: string
    pages: PageInterface[]
    
    prompts: {
        text: string
        basePrompt:string
        promptsSuggestions:PromptSuggestionInterface[]
    }
    settingsV2:SettingV2ItemInterface[]
    popupMessages:{
        [key:string]:string
    }
}

// child elements interface
interface PageInterface {
    id:string
    text:string
    icon:string
}

export interface SettingV2ItemInterface {
    id:string
    text:string
    type:string
    values: SettingV2ItemValueInterface[]
}

export interface SettingV2ItemValueInterface {
    id:number
    text:string
    value:string
}

interface PromptSuggestionInterface {
    id:number
    text:string
    description:string
    prompt:string
}

// type for the prop of the context itself
interface AppContentProps{
    appContent:AppContentInterface
    languageV2:number
    setLanguageV2: Dispatch<SetStateAction<number>>
}

const AppContentContext = createContext<AppContentProps>({
    appContent:content['en'],
    languageV2: 0,
    setLanguageV2: () => ''
})

const languageMap: Record<number, string> = {
    0: "en",
    1: "fr",
}
    
const AppContentProvider:FC<ContextProviderProps> = ({children}) => {
    
    const [languageV2, setLanguageV2] = useState<number>(0)

    const languageString = languageMap[languageV2] || "en"

    // app content, depending on the value of language (if it's set to french or english)
    const appContent = content[languageString as keyof typeof content]

    // retrieving a possibly stored setting for language or prompt
    useEffect(() => {

        // checking whether chrome object is accessible or not
        if (typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.sync.get(['language'], (result) => {
                if (result.language) {
                    setLanguageV2(result.language)
                    console.log('a language setting has been restored from chrome storage')
                }
            })
        }
        // else console.warn('chrome.storage is not available in the current environment')
    }, [])

    return (
        <AppContentContext.Provider value={{appContent, languageV2,setLanguageV2}}>
            {children}
        </AppContentContext.Provider>
    )
}

export {AppContentContext,AppContentProvider}