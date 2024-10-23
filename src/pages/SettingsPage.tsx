import { FC } from "react"
import { AppContentProps, LanguageProps, PromptsProps } from "../interfaces/globalProps"
import styled from "styled-components"
import { colorsVariables } from "../style/variables"
import { ButtonType1 } from "../style/styledComponents"
import SettingItem from "../components/settings/SettingItem"
import useAppContext from "../components/context/useAppContext"
import { GlobalContext } from "../components/context/ContextProvider"

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

// storing the setting in the chrome storage
const saveToChromeStorage = (settingId: string, settingValue: string|number) => {
    if (chrome) {
        chrome.storage.sync.set({ [settingId]: settingValue }, () => {
            console.log(`${settingId} saved:`, settingValue)
        })
    }
    else console.warn('Chrome not found in current environment')
}

// const SettingsPage:FC<SettingsPageProps & AppContentProps & LanguageProps & PromptsProps> = ({appContent, setLanguage, language, promptId, setPromptId}) => {
const SettingsPage:FC<SettingsPageProps & AppContentProps> = ({appContent}) => {

    const {setLanguage, language, setPromptId} = useAppContext(GlobalContext)

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
        <Style className="settingsPage">
            {appContent.settings.map((settingItem) => (
                <div key={settingItem.id} className="settingItem">
                    
                    <SettingItem key={settingItem.id} settingItem={settingItem}/>
                    
                    <h4>{settingItem.text}</h4>
                    
                    <div className="settingItemValues">
                        {settingItem.values.map((settingItemValue, index) => (
                            <ButtonType1 
                                className={`settingItemValue ${settingItemValue === language ? 'settingItemValue-selected' : ''}`}
                                key={index} 
                                onClick={() => onClickActions(settingItem.id, settingItemValue)}
                            >
                                {settingItemValue}
                            </ButtonType1>
                        ))}
                    </div>
                </div>
            ))}
        </Style>
    )
}

export default SettingsPage