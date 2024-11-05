import { createContext, FC, useContext } from 'react'
import content from '../../../public/assets/content.json'
import { GlobalContext } from './ContextProvider'
import { ContextProviderProps } from '../../interfaces/globalProps'

interface AppContentInterface {
    title: string
    pages: PageInterface[]
    
    prompts: {
        text: string
        promptsSuggestions:PromptSuggestionInterface[]
    }
    settings: SettingItemInterface[]
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

// deprecated
// interface ToneOptionInterface {
//     id:number
//     text:string
//     prompt:string
// }

interface PromptSuggestionInterface {
    id:number
    text:string
    description:string
    prompt:string
}
interface SettingItemInterface {
    id:string
    text:string
    values:string[] | number[]
}

// type for the prop of the context itself
interface AppContentProps{
    appContent:AppContentInterface
}

const AppContentContext = createContext<AppContentProps>({appContent:content['en']})
    
const AppContentProvider:FC<ContextProviderProps> = ({children}) => {
    
    // getting the language from the globalContext
    const { language } = useContext(GlobalContext)

    // app content, depending on the value of language (if it's set to french or english)
    const appContent = content[language as keyof typeof content]

    return (
        <AppContentContext.Provider value={{appContent}}>
            {children}
        </AppContentContext.Provider>
    )
}

export {AppContentContext,AppContentProvider}