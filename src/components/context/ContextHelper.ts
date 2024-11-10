// import { useContext, useEffect } from "react"
// import { LanguageContext } from "./LanguageContextProvider"
// import { GlobalContext } from "./ContextProvider"

// function to retrieve elements in chrome storage
// export const chromeStorageRetrieving = (itemsToRetrieveInChromeStorage:[string]) => {

//     const {setLanguage} = useContext(LanguageContext)

//     const {setPromptId} = useContext(GlobalContext)

//     // retrieving a possibly stored setting for language or prompt
//     useEffect(() => {

//         // checking whether chrome object is accessible or not
//         if (typeof chrome !== 'undefined' && chrome.storage) {

//             itemsToRetrieveInChromeStorage.map((itemToRetrieve) => {
//                 chrome.storage.sync.get([itemToRetrieve], (result) => {
//                     if (result.itemToRetrieve) {
                        
//                     }
//                 })
//             })

//             chrome.storage.sync.get(['language'], (result) => {
//                 if (result.language) {
//                     setLanguage(result.language)
//                     console.log('a language setting has been restored from chrome storage')
//                 }
//             })
//             chrome.storage.sync.get(['defaultPrompt'], (result) => {
//                 if (result.defaultPrompt) {
//                     setPromptId(result.defaultPrompt)
//                     console.log('a default prompt has been restored from chrome storage')
//                 }
//             })

//         }
//         // else console.warn('chrome.storage is not available in the current environment')
//     }, [])
// }

// saving the setting to chrome if chrome is available
export const savingToChromeStorage = (itemNameInChromeStorage:string, ItemValue:number, syncStorage:boolean, callbackFunction:()=> void) => {
    if (chrome !== undefined && chrome.storage && chrome.storage.sync) {
        
        // if synchronisation is true, the item will be stored in the chrome synced storage
        if (syncStorage) chrome.storage.sync.set({ [itemNameInChromeStorage]: ItemValue })
            
        // if synchronisation is false, the item will be stored in the chrome local storage
        else chrome.storage.local.set({ [itemNameInChromeStorage]: ItemValue })

        callbackFunction()
        
        console.log(`${itemNameInChromeStorage} saved:`, ItemValue)
    }
}

// export default {chromeStorageRetrieving, savingToChromeStorage}