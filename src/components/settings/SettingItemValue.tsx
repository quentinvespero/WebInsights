import { FC } from 'react'
import CheckableButton from '../CheckableButton'
import useAppContext from '../context/useAppContext'
import { GlobalContext } from '../context/ContextProvider'
import { SettingItemInterface } from '../../interfaces/appContentInterfaces'

interface SettingItemValueProps{
    settingItemValue:string|number
    parentSettingItemId:SettingItemInterface['id']
}

const saveToChromeStorage = (settingId: string, settingValue: string|number) => {
    if (chrome !== undefined && chrome.storage && chrome.storage.sync) {
        chrome.storage.sync.set({ [settingId]: settingValue }, () => {
            console.log(`${settingId} saved:`, settingValue)
        })
    }
    else console.warn('Chrome not found in current environment')
}

const SettingItemValue:FC<SettingItemValueProps> = ({settingItemValue,parentSettingItemId}) => {

    const {setLanguage, setPromptId, language, promptId} = useAppContext(GlobalContext)

    const onClickActions = (settingItemId:string, settingItemValue:string|number) => {
        switch (settingItemId) {
            
            case 'language':
                setLanguage(settingItemValue as string)
                saveToChromeStorage(settingItemId,settingItemValue)
                console.log('language set to :', settingItemValue)
                break
                
            case 'defaultTone':
                setPromptId(settingItemValue as number)
                saveToChromeStorage(settingItemId,settingItemValue)
                console.log('tone set to :', settingItemValue)
                break

            case 'personalPrompt':
                break

            case 'apiKey':
                // mettre fenetre en premier plan où entrer l'api key
                break

            default:
                break
        }
    }

    return (
        <div className="settingItemValue" onClick={() => onClickActions(parentSettingItemId, settingItemValue)}>
            <CheckableButton selected={settingItemValue === language || settingItemValue === promptId} >
                {settingItemValue}
            </CheckableButton>
        </div>
    )
}

export default SettingItemValue