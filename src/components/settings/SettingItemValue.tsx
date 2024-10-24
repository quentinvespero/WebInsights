import { FC, useState } from 'react'
import CheckableButton from '../CheckableButton'
import useAppContext from '../context/useAppContext'
import { GlobalContext } from '../context/ContextProvider'
import { SettingItemInterface } from '../../interfaces/appContentInterfaces'
import { ApiContext } from '../context/ApiKeyProvider'

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

    // consuming the global context
    const {setLanguage, setPromptId, language, promptId} = useAppContext(GlobalContext)

    // keeping track of whether the input menu (to enter the api key) is visible or not
    const [showInputElement, setShowInputElement] = useState<boolean>(false)

    // consuming the api context
    const {apiKeyState, settingUpApiKey} = useAppContext(ApiContext)

    // keeping track of the new API key
    const [newApiKey, setNewApiKey] = useState('')

    // a range of actions to perform, depending on the type of setting
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
                setShowInputElement(!showInputElement)
                break

            default:
                break
        }
    }

    return (
        <div className="settingItemValue" onClick={() => onClickActions(parentSettingItemId, settingItemValue)}>
            <CheckableButton selected={settingItemValue === language || settingItemValue === promptId} >
                
                {settingItemValue}

                {parentSettingItemId === 'apiKey' && showInputElement && 
                    <div className="inputElements">
                        <input
                            type="text"
                            value={newApiKey}
                            onChange={(e) => setNewApiKey(e.target.value)}
                            placeholder="Enter API Key"
                        />
                        <button onClick={settingUpApiKey(newApiKey)}>Save API Key</button>
                        <p>Current API Key: {apiKeyState}</p>
                        test
                        {apiKeyState}
                    </div>
                }

            </CheckableButton>
        </div>
    )
}

export default SettingItemValue