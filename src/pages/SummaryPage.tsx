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

const SummaryPage:FC<SummaryPageProps & AppContentProps> = (appContent) => {

    const [prompt, setPrompt] = useState('')

    const definingPrompt = (promptId:ToneOptionInterface['id']) => {
        const promptText = appContent.appContent.tones.tonesOptions[promptId].prompt
        setPrompt(promptText)
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
        }
    `

    return (
        <Style className="summaryPage">
            
            <ErrorBoundary fallback={<p>error</p>}>
                <Suspense fallback={<p>loading</p>}>
                    <SummaryComponent prompt={prompt}/>
                </Suspense>
            </ErrorBoundary>
            
            <div className="tonesSelector">
                {appContent.appContent.tones.tonesOptions.map((tone) => (

                    <StyledButton key={tone.id} className="tone" onClick={() => definingPrompt(tone.id)}>
                        <ButtonWithIcon text={tone.text} description={tone.prompt}/>
                    </StyledButton>
                    
                ))}
            </div>
        </Style>
    )
}

export default SummaryPage