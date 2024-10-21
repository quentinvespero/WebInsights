// main interface

export interface AppContentInterface {
    title: string
    pages: PageInterface[]

    // deprecated
    tones: {
        text: string
        tonesOptions:ToneOptionInterface[]
    }
    
    prompts: {
        text: string
        promptsSuggestions:PromptSuggestionInterface[]
    }
    settings: SettingItemInterface[]
}

export interface AppContentLanguageInterface {
    en: AppContentInterface
    fr: AppContentInterface
}

// child elements interface
export interface PageInterface {
    id:string
    text:string
    icon:string
}

// deprecated
export interface ToneOptionInterface {
    id:number
    text:string
    prompt:string
}

export interface PromptSuggestionInterface {
    id:number
    text:string
    prompt:string
}
export interface SettingItemInterface {
    id:string
    text:string
    values:string[] | number[]
}