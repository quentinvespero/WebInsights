import { FC } from 'react'
import { ButtonType1 } from '../../style/styledComponents'
import CheckableButton from '../CheckableButton'
import useAppContext from '../context/useAppContext'
import { GlobalContext } from '../context/ContextProvider'
import { SettingItemInterface } from '../../interfaces/appContentInterfaces'

interface SettingItemValueProps{
    settingItemValue:string|number
    parentSettingItemId:SettingItemInterface['id']
}

const saveToChromeStorage = (settingId: string, settingValue: string|number) => {
    if (chrome) {
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
                break
                
            case 'defaultTone':
                () => setPromptId(settingItemValue as number)
                // saveToChromeStorage(settingItemId,settingItemValue)
                console.log('defaultTone :', settingItemValue)
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
        <CheckableButton selected={settingItemValue === language || settingItemValue === promptId}>
            <ButtonType1
                className={`settingItemValue`}
                // key={index} 
                onClick={() => onClickActions(parentSettingItemId, settingItemValue)}
            >
                {settingItemValue}
            </ButtonType1>
        </CheckableButton>
    )
}

export default SettingItemValue