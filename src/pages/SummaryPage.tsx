import { FC, Suspense } from "react"
import SummaryComponent from "../components/SummaryComponent"
import { AppContentProps, PromptsProps } from "../interfaces/globalProps"
import { ErrorBoundary } from "react-error-boundary"
import { styled } from "styled-components"
import { colorsVariables } from "../style/variables"
import ButtonWithIcon from "../components/ButtonWithIcon"
import { ButtonType1 } from "../style/styledComponents"
import CheckableButton from "../components/CheckableButton"

interface SummaryPageProps {
    
}

const Style = styled.div `
    display:flex;
    flex-direction:column;
    row-gap:1rem;
    
    .tonesSelector{
        display:flex;
        gap:1rem;
        flex-wrap:wrap;

        & .checkableButton-selected{
            & .tone{
                background:${colorsVariables.color4};
            }
        }
        
        & .tone{
            display:flex;
            padding:.2rem 1rem;
            border-radius:.5rem;
            background:${colorsVariables.color3_dark};
            align-items:center;
            justify-content:center;
            border:solid .1rem ${colorsVariables.color3_dark};
            
            & .buttonWithIcon{
                span{
                    display:none;
                }
            }
        }
    }
`

const SummaryPage:FC<SummaryPageProps & AppContentProps & PromptsProps> = ({appContent, promptId, setPromptId}) => {
    
    // const [selectedPromptObject, setSelectedPromptObject] = useState<PromptSuggestionInterface>(appContent.prompts.promptsSuggestions[promptId])

    const selectedPromptObject = appContent.prompts.promptsSuggestions[promptId]

    return (
        <Style className="summaryPage">

            <p>tone used for the summary : <strong>{selectedPromptObject.id}</strong></p>
            
            <ErrorBoundary fallback={<p>error</p>}>
                <Suspense fallback={<p>loading</p>}>
                    <SummaryComponent prompt={selectedPromptObject.prompt}/>
                </Suspense>
            </ErrorBoundary>
            
            <div className="tonesSelector">
                {appContent.prompts.promptsSuggestions.map((promptItem) => (

                    <CheckableButton key={promptItem.id} selected={promptItem.id === promptId}>
                        <ButtonType1 className='tone' onClick={() => setPromptId(promptItem.id)}>
                            <ButtonWithIcon text={promptItem.text} description={promptItem.prompt}/>
                        </ButtonType1>
                    </CheckableButton>
                    
                ))}
            </div>
        </Style>
    )
}

export default SummaryPage