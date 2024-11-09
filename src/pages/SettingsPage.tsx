import { useContext } from "react"
import styled from "styled-components"
import { colorsVariables } from "../style/variables"
import SettingItem from "../components/settings/SettingItem"
import { AppContentContext } from "../components/context/AppContentContextProvider"

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
const SettingsPage = () => {

    const {appContent} = useContext(AppContentContext)

    return (
        <Style className="settingsPage">
            {appContent.settings.map((settingItem) => (
                <SettingItem key={settingItem.id} settingItem={settingItem}/>
            ))}
            <p>settingsV2</p>
            {appContent.settingsV2.map((settingV2Item) => (
                <SettingItem key={settingV2Item.id} settingV2Item={settingV2Item}/>
            ))}
        </Style>
    )
}

export default SettingsPage