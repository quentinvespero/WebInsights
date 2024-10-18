import { FC, Suspense, useState } from "react"
import SummaryComponent from "../components/SummaryComponent"
import { AppContentProps } from "../interfaces/globalProps"
import { ToneOptionInterface } from "../interfaces/appContentInterfaces"
import { ErrorBoundary } from "react-error-boundary"
import { styled } from "styled-components"
import { colorsVariables } from "../style/variables"
import ButtonWithIcon from "../components/ButtonWithIcon"

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
            flex-direction:column;
            row-gap:.5rem;
            flex-wrap:wrap;
            
            & .tone{
                display:flex;
                flex-direction:row;
                column-gap:1rem;
                padding:.5rem;
                border-radius:.5rem;
                background:${colorsVariables.color3_dark};
                border:solid .15rem ${colorsVariables.color2};
                align-items:center;
                justify-content:center;
                
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
                    <div key={tone.id} className="tone" onClick={() => definingPrompt(tone.id)}>
                        <ButtonWithIcon text={tone.text} description={tone.prompt}/>
                    </div>
                ))}
            </div>
        </Style>
    )
}

export default SummaryPage