import { useContext, useState } from "react"
import styled from "styled-components"
import { ApiKeyContext } from "../context/ApiKeyContextProvider"
import { AppContentContext } from "../context/AppContentContextProvider"

const Style = styled.div`
    display:flex;
    flex-direction:column;
    row-gap:.5rem;
    
    & .inputElement{
        display:flex;
        flex-direction:row;
        column-gap:.5rem;

        & input{
            padding: .3rem 1rem;
            border-radius: 3rem;
            border: .15rem solid grey;
            
        }
    }
    & > .popup{
        font-weight:700;
        color:greenyellow;
    }
`

const SettingItemApiSection = () => {

    // keeping track of the new API key
    const [newApiKey, setNewApiKey] = useState('')

    // keeping track of whether the newApiKey has been saved to chrome storage in the ApiContext, or not
    const [isKeySaved, setIsKeySaved] = useState(false)

    // error message display if api key os too short or such
    const [errorOnApiKey, setErrorOnApiKey] = useState<boolean>(false)

    // consuming the api key context
    const { partialApiKey, settingUpApiKey } = useContext(ApiKeyContext)

    const {appContent} = useContext(AppContentContext)

    // handling click
    const handlingApiKeySaving = () => {

        if (newApiKey.length > 10) {
            settingUpApiKey(newApiKey, () => {
                setIsKeySaved(true)
                setTimeout(() => setIsKeySaved(false), 2000)
            })
        }
        else {
            setErrorOnApiKey(true)
            setTimeout(() => setErrorOnApiKey(false), 4000)
        }
    }

    return (
        <Style className="settingItemApiSection">
            <div className="inputElement">
                <input
                    type="text"
                    value={newApiKey}
                    onChange={(e) => { setNewApiKey(e.target.value) }}
                    placeholder="Enter API Key"
                />
                <button onClick={() => handlingApiKeySaving()}>{'save'}</button>
            </div>

            {isKeySaved && <p className="popup">{appContent.popupMessages.apiKeySaved}</p>}
            {errorOnApiKey && <p>{appContent.popupMessages.apiKeySeemTooShort}</p>}
            
            <p>current api key: {partialApiKey}</p>
        </Style>
    )
}

export default SettingItemApiSection