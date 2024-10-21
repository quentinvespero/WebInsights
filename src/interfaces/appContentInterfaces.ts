// main interface

export interface AppContentInterface {
    title: string
    pages: PageInterface[]
    tones: {
        text: string
        tonesOptions:ToneOptionInterface[]
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
export interface ToneOptionInterface {
    id:number
    text:string
    prompt:string
}
export interface SettingItemInterface {
    id:string
    text:string
    values:string[]
}