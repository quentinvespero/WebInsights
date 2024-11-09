import { FC, useContext, useState } from 'react'
import CheckableButton from '../CheckableButton'
import { GlobalContext } from '../context/ContextProvider'
import { SettingItemInterface } from '../../interfaces/appContentInterfaces'
import styled from 'styled-components'
import SettingItemApiSection from './SettingItemApiSection'
import { SettingV2ItemValueInterface } from '../context/AppContentContextProvider'
import { PromptContext } from '../context/PromptContextProvider'
import { colorsVariables } from '../../style/variables'

interface SettingItemValueProps{
    parentSettingItemId:SettingItemInterface['id']
    settingV2ItemValue:SettingV2ItemValueInterface
}

const Style = styled.div`
    display:flex;
    flex-direction:column;
    row-gap:1.5rem;
    align-items:flex-start;

    .settingItemValue-selected{
        background:${colorsVariables.color4}
    }
`

const SettingItemValue:FC<SettingItemValueProps> = ({parentSettingItemId, settingV2ItemValue}) => {

    // consuming the global context
    const {savingSettingV2,languageV2 } = useContext(GlobalContext)

    const {promptId} = useContext(PromptContext)

    // keeping track of whether the input menu (to enter the api key) is visible or not
    const [showInputElement, setShowInputElement] = useState<boolean>(false)

    const [isSettingItemValueSelected, setIsSettingItemValueSelected] = useState<boolean>(false)
    
    // a range of actions to perform, depending on the type of setting
    // for settingsV2
    const onClickActions = (parentSettingItemId:string) => {
        
        switch (parentSettingItemId) {
            
            case 'language': 
                savingSettingV2(parentSettingItemId,settingV2ItemValue, () => setIsSettingItemValueSelected(true))
                break
            case 'defaultPrompt': savingSettingV2(parentSettingItemId,settingV2ItemValue, () => setIsSettingItemValueSelected(true))
                break
            case 'personalPrompts':
                break
            case 'apiKey': setShowInputElement(!showInputElement)
                break
            default:
                break
        }
    }

    const isSettingSelected = () => {
        switch (parentSettingItemId) {
            case '':
                
                break;
        
            default:
                break;
        }
    }

    return (
        <Style className="settingItemValue">
            <div className="button" onClick={() => onClickActions(parentSettingItemId)}>

                {/* have to improve the way it get selected value below */}
                <CheckableButton selected={isSettingItemValueSelected}>
                    {settingV2ItemValue.text}
                </CheckableButton>
            </div>
            
            {parentSettingItemId === 'apiKey' && showInputElement && <SettingItemApiSection/>}

        </Style>
    )
}

export default SettingItemValue