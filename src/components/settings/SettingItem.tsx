import { FC, useContext, useState } from "react"
import { AppContentContext, SettingV2ItemInterface } from "../context/AppContentContextProvider"
import styled from "styled-components"
import SettingItemApiSection from "./SettingItemApiSection"
import { GlobalContext } from "../context/ContextProvider"
import { PromptContext } from "../context/PromptContextProvider"
import { ErrorBoundary } from "react-error-boundary"
import FallbackError from "../fallbackComponents/FallbackError"

interface SettingItemProps {
    settingV2Item:SettingV2ItemInterface
}

const Style = styled.div`
    display:flex;
    flex-direction:column;
    row-gap:.5rem;

    .settingItemValues{
        flex-direction:column;
        align-items:flex-start;
        display:flex;
        row-gap:.8rem;
    }
`

const SettingItem:FC<SettingItemProps> = ({settingV2Item}) => {

    const [showInputElement, setShowInputElement] = useState<boolean>(false)

    // function to save the setting in both react state and chrome storage if available
    const {savingSettingV2} = useContext(GlobalContext)

    const {promptId} = useContext(PromptContext)
    const {languageV2} = useContext(AppContentContext)

    // using the values of promptId and languageV2 as default value for the select
    const selectedSetting = settingV2Item.id === 'language' ? languageV2 : promptId

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValueId = Number(event.target.value)
        const selectedValue = settingV2Item.values.find(value => value.id === selectedValueId)

        if (selectedValue) {
            savingSettingV2(settingV2Item.id, selectedValue.id)
            console.log('----- SettingItem - handleSelectChange - sending values to be saved : -----',settingV2Item.id,selectedValue.id)
        }
    }

    return (
        <Style className="settingItem">
            <h4>{settingV2Item.text}</h4>
            
            <div className="settingItemValues">

                {/* below, render depending on the type of the setting (if it's a selector or button) */}
                {settingV2Item.type === 'selector'
                    
                    ?
                    
                    <select className="settingItemValues-selector" onChange={handleSelectChange} value={selectedSetting}>
                        {settingV2Item.values.map((settingV2ItemValue) => (
                            <option key={settingV2ItemValue.id} value={settingV2ItemValue.id}>{settingV2ItemValue.text}</option>
                        ))}
                    </select>

                    : // for the 2nd type of settings, "button"
                    
                    settingV2Item.values.map((settingV2ItemValue) => (
                        // <SettingItemValue key={settingV2ItemValue.id} settingV2ItemValue={settingV2ItemValue} parentSettingItemId={settingV2Item.id}/>
                        <button key={settingV2ItemValue.id} onClick={() => setShowInputElement(!showInputElement)}>{settingV2ItemValue.text}</button>
                    ))
                }

                <ErrorBoundary fallback={<FallbackError/>}>
                    {settingV2Item.id === 'apiKey' && showInputElement && <SettingItemApiSection/>}
                </ErrorBoundary>

            </div>
        </Style>
    )
}

export default SettingItem