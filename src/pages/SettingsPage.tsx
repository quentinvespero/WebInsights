import { FC } from "react"
import { AppContentProps, LanguageProps } from "../interfaces/globalProps"
import styled from "styled-components"
import { colorsVariables } from "../style/variables"
import { ButtonType1 } from "../style/styledComponents"

interface SettingsPageProps {
    // setLanguage: LanguageProps['setLanguage']
    // language:LanguageProps['language']
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

const SettingsPage:FC<SettingsPageProps & AppContentProps & LanguageProps> = ({appContent, setLanguage, language}) => {

    const onClickActions = (settingItemId:string, settingItemValue:'fr'|'en') => {
        switch (settingItemId) {
            case 'language':
                setLanguage(settingItemValue)
                
                // saving the language setting to the chrome storage
                chrome.storage.sync.set({ language: settingItemValue }, () => {
                    console.log('Language saved:', settingItemValue)
                })
                break
            case 'defaultTone':
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
                    <h4>{settingItem.text}</h4>
                    <div className="settingItemValues">
                        {settingItem.values.map((settingItemValue, index) => (
                            <ButtonType1 
                                className={`settingItemValue ${settingItemValue === language ? 'settingItemValue-selected' : ''}`}
                                key={index} 
                                onClick={() => onClickActions(settingItem.id, settingItemValue as 'fr' | 'en')}
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