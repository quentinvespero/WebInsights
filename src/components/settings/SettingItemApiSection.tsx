import { useState } from "react"
import { ButtonType1 } from "../../style/styledComponents"
import useAppContext from "../context/useAppContext"
import { ApiContext } from "../context/ApiContextProvider"
import styled from "styled-components"

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
        & button{
            padding: .3rem 1rem;
            border-radius: 3rem;
            border: .15rem solid grey;
            cursor:pointer;
        }
    }
`

const SettingItemApiSection = () => {

    // keeping track of the new API key
    const [newApiKey, setNewApiKey] = useState('')

    // keeping track of whether the newApiKey has been saved to chrome storage in the ApiContext, or not
    const [isKeySaved, setIsKeySaved] = useState(false)

    // consuming the api context
    const {partialApiKey, settingUpApiKey} = useAppContext(ApiContext)

    // handling click
    const handlingApiKeySaving = () => {
        settingUpApiKey(newApiKey, () => {
            setIsKeySaved(true)
            setTimeout(() => setIsKeySaved(false), 2000)
        })
    }

    return (
        <Style className="settingItemApiSection">
            <div className="inputElement">
                <input
                    type="text"
                    value={newApiKey}
                    onChange={(e) => setNewApiKey(e.target.value)}
                    placeholder="Enter API Key"
                />
                <ButtonType1 onClick={() => handlingApiKeySaving}>{'save'}</ButtonType1>
                {isKeySaved && <p>{'saved :)'}</p>}
            </div>
            {<p>current api key: {partialApiKey}</p>}
        </Style>
    )
}

export default SettingItemApiSection