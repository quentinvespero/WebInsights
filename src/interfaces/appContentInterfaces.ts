// main interface

export interface AppContentInterface {
    title: string
    pages: PageInterface[]
    tones: {
        text: string
        tonesOptions:ToneOptionInterface[]
    }
    settings: {
        language: SettingItemInterface
        defaultTone: SettingItemInterface
        personalPrompt: SettingItemInterface
    }
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
export interface ToneOptionInterface {
    id:number
    text:string
    prompt:string
}
export interface SettingItemInterface {
    text:string
    options?:string[]
    prompt?:string
}