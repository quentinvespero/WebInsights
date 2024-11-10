import { FC, useContext } from "react"
import CheckableButton from "../CheckableButton"
import ButtonWithIcon from "../ButtonWithIcon"
import { PromptSuggestionInterface } from "../../interfaces/appContentInterfaces"
import styled from "styled-components"
import { colorsVariables } from "../../style/variables"
import { PromptContext } from "../context/PromptContextProvider"

interface PromptSuggestionItemProps {
    promptSuggestionItem:PromptSuggestionInterface
}

const Style = styled.div`
    /* display:flex;
    padding:.2rem 1rem;
    border-radius:.5rem;
    background:${colorsVariables.color3_dark};
    align-items:center;
    justify-content:center;
    border:solid .1rem ${colorsVariables.color3_dark}; */

    & .checkableButton{
        text-align:center;

        & .buttonWithIcon{
            & span{
                font-size:.6rem;
            }
        }
    }
`

const PromptSuggestionItem:FC<PromptSuggestionItemProps> = ({promptSuggestionItem}) => {

    const {promptId, setPromptId} = useContext(PromptContext)

    return (
        <Style className="promptSuggestionItem" onClick={() => setPromptId(promptSuggestionItem.id)}>
            <CheckableButton key={promptSuggestionItem.id} selected={promptSuggestionItem.id === promptId}>
                <ButtonWithIcon text={promptSuggestionItem.text} description={promptSuggestionItem.description}/>
            </CheckableButton>
        </Style>
    )
}

export default PromptSuggestionItem