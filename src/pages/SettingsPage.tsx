import { FC } from "react"
import { AppContentProps } from "../interfaces/globalProps"
import styled from "styled-components"
import { colorsVariables } from "../style/variables"
import SettingItem from "../components/settings/SettingItem"

interface SettingsPageProps {
}

const Style = styled.div`
    display:flex;
    flex-direction:column;
    row-gap:1.5rem;
    
    .settingItem{
        display:flex;
        flex-direction:column;
        row-gap:.5rem;
        
        & .settingItemValues{
            flex-direction:row;
            display:flex;
            column-gap:.8rem;
    
            & .settingItemValue{
                /* background:${colorsVariables.color3_dark} */
            }
            & .settingItemValue-selected{
                background:${colorsVariables.color4}
            }
        }
    }
`

// const SettingsPage:FC<SettingsPageProps & AppContentProps & LanguageProps & PromptsProps> = ({appContent, setLanguage, language, promptId, setPromptId}) => {
const SettingsPage:FC<SettingsPageProps & AppContentProps> = ({appContent}) => {

    return (
        <Style className="settingsPage">
            {appContent.settings.map((settingItem) => (
                <SettingItem key={settingItem.id} settingItem={settingItem}/>
            ))}
        </Style>
    )
}

export default SettingsPage