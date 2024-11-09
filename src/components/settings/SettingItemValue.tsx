import { FC, useState } from 'react'
import CheckableButton from '../CheckableButton'
import useAppContext from '../context/useAppContext'
import { GlobalContext } from '../context/ContextProvider'
import { SettingItemInterface } from '../../interfaces/appContentInterfaces'
import styled from 'styled-components'
import SettingItemApiSection from './SettingItemApiSection'
import { SettingV2ItemValueInterface } from '../context/AppContentContextProvider'

interface SettingItemValueProps{
    settingItemValue:string|number
    parentSettingItemId:SettingItemInterface['id']
    settingV2ItemValue:SettingV2ItemValueInterface
}

const Style = styled.div`
    display:flex;
    flex-direction:column;
    row-gap:1.5rem;
    align-items:flex-start;
`

const SettingItemValue:FC<SettingItemValueProps> = ({settingItemValue,parentSettingItemId, settingV2ItemValue}) => {

    // consuming the global context
    const {language, promptId, savingSetting} = useAppContext(GlobalContext)

    // keeping track of whether the input menu (to enter the api key) is visible or not
    const [showInputElement, setShowInputElement] = useState<boolean>(false)

    // a range of actions to perform, depending on the type of setting
    const onClickActions = (parentSettingItemId:string, settingItemValue:string|number) => {
        
        switch (parentSettingItemId) {
            
            case 'language': savingSetting(parentSettingItemId,settingItemValue) // saving setting in chrome's storage
                break
            case 'defaultPrompt': savingSetting(parentSettingItemId,settingItemValue)
                break
            case 'personalPrompts':
                break
            case 'apiKey': setShowInputElement(!showInputElement)
                break
            default:
                break
        }
    }

    return (
        <Style className="settingItemValue">
            <div className="button" onClick={() => onClickActions(parentSettingItemId,settingItemValue)}>
                <CheckableButton selected={settingItemValue === language || settingItemValue === promptId}>
                    {settingItemValue}
                </CheckableButton>
            </div>
            
            {parentSettingItemId === 'apiKey' && showInputElement && <SettingItemApiSection/>}

        </Style>
    )
}

export default SettingItemValue