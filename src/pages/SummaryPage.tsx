import { FC, Suspense, useState } from "react"
import SummaryComponent from "../components/SummaryComponent"
import { AppContentProps } from "../interfaces/globalProps"
import { ToneOptionInterface } from "../interfaces/appContentInterfaces"
import { ErrorBoundary } from "react-error-boundary"
import Styled, { styled } from "styled-components"
import { colorsVariables } from "../style/variables"
import ButtonWithIcon from "../components/ButtonWithIcon"
import { StyledButton } from "../style/styledComponents"

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
        
        & .tone{
            display:flex;
            flex-direction:row;
            column-gap:1rem;
            padding:.3rem 1.3rem;
            border-radius:.5rem;
            background:${colorsVariables.color3_dark};
            align-items:center;
            justify-content:center;
            /* cursor:pointer; */
            border:solid .1rem ${colorsVariables.color3_dark};
            
            & .buttonWithIcon{
                span{
                    display:none;
                }
            }
        }
        & .tone-selected{
            background:${colorsVariables.color4};
        }
    }
`

const SummaryPage:FC<SummaryPageProps & AppContentProps> = (appContent) => {
    
    const defaultPrompt = appContent.appContent.tones.tonesOptions[0]

    const [tone, setTone] = useState<ToneOptionInterface>(defaultPrompt)

    // const definingPrompt = (promptId:ToneOptionInterface['id']) => {
    //     const promptText = appContent.appContent.tones.tonesOptions[promptId].prompt
    //     setPrompt(promptText)
    // }

    // const definingTone = (tone:ToneOptionInterface) => setTone(tone)

    return (
        <Style className="summaryPage">

            <p>tone used for the summary : <strong>{tone?.text}</strong></p>
            
            <ErrorBoundary fallback={<p>error</p>}>
                <Suspense fallback={<p>loading</p>}>
                    <SummaryComponent prompt={tone?.prompt}/>
                </Suspense>
            </ErrorBoundary>
            
            <div className="tonesSelector">
                {appContent.appContent.tones.tonesOptions.map((toneItem) => (

                    <StyledButton key={toneItem.id} className={`tone ${toneItem.id === tone?.id ? 'tone-selected' : ''}`} onClick={() => setTone(toneItem)}>
                        <ButtonWithIcon text={toneItem.text} description={toneItem.prompt}/>
                    </StyledButton>
                    
                ))}
            </div>
        </Style>
    )
}

export default SummaryPage