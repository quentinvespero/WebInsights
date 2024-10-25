import { FC, useState } from 'react'
import CheckableButton from '../CheckableButton'
import useAppContext from '../context/useAppContext'
import { GlobalContext } from '../context/ContextProvider'
import { SettingItemInterface } from '../../interfaces/appContentInterfaces'
import { ApiContext } from '../context/ApiContextProvider'

interface SettingItemValueProps{
    settingItemValue:string|number
    parentSettingItemId:SettingItemInterface['id']
}

// const saveToChromeStorage = (settingId: string, settingValue: string|number) => {
//     if (chrome !== undefined && chrome.storage && chrome.storage.sync) {
//         chrome.storage.sync.set({ [settingId]: settingValue }, () => {
//             console.log(`${settingId} saved:`, settingValue)
//         })
//     }
//     else console.warn('Chrome not found in current environment')
// }

const SettingItemValue:FC<SettingItemValueProps> = ({settingItemValue,parentSettingItemId}) => {

    // consuming the global context
    const {language, promptId, savingSetting} = useAppContext(GlobalContext)

    // keeping track of whether the input menu (to enter the api key) is visible or not
    const [showInputElement, setShowInputElement] = useState<boolean>(false)

    // consuming the api context
    const {apiKeyState, settingUpApiKey} = useAppContext(ApiContext)

    // keeping track of the new API key
    const [newApiKey, setNewApiKey] = useState('')

    // a range of actions to perform, depending on the type of setting
    const onClickActions = (parentSettingItemId:string, settingItemValue:string|number) => {
        
        switch (parentSettingItemId) {
            
            case 'language':
                savingSetting(parentSettingItemId,settingItemValue)
                break
            case 'defaultPrompt':
                savingSetting(parentSettingItemId,settingItemValue)
                break
            case 'personalPrompts':
                break
            case 'apiKey':
                setShowInputElement(!showInputElement)
                break
            default:
                break
        }
    }

    return (
        <div className="settingItemValue">
            {/* <div className="button" onClick={() => onClickActions(parentSettingItemId, settingItemValue)}> */}
            <div className="button" onClick={() => onClickActions(parentSettingItemId,settingItemValue)}>
                <CheckableButton selected={settingItemValue === language || settingItemValue === promptId}>
                    {settingItemValue}
                </CheckableButton>
            </div>
            
            {parentSettingItemId === 'apiKey' && showInputElement && 
                <div className="inputElements">
                    <input
                        type="text"
                        value={newApiKey}
                        onChange={(e) => setNewApiKey(e.target.value)}
                        placeholder="Enter API Key"
                    />
                    <button onClick={() => settingUpApiKey(newApiKey)}>Save API Key</button>
                    <p>Current API Key: {apiKeyState}</p>
                </div>
            }

        </div>
    )
}

export default SettingItemValue