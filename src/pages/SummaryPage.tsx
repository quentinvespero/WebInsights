import { FC, Suspense, useState } from "react"
import SummaryComponent from "../components/SummaryComponent"
import { AppContentProps } from "../interfaces/globalProps"
import { ToneOptionInterface } from "../interfaces/appContentInterfaces"
import { ErrorBoundary } from "react-error-boundary"

interface SummaryPageProps {
    
}

const SummaryPage:FC<SummaryPageProps & AppContentProps> = (appContent) => {

    const [prompt, setPrompt] = useState('')

    const definingPrompt = (promptId:ToneOptionInterface['id']) => {
        const promptText = appContent.appContent.tones.tonesOptions[promptId].prompt
        setPrompt(promptText)
    }

    return (
        <div>
            
            <ErrorBoundary fallback={<p>error</p>}>
                <Suspense fallback={<p>loading</p>}>
                    <SummaryComponent prompt={prompt}/>
                </Suspense>
            </ErrorBoundary>
            
            <div className="tonesSelector">
                {appContent.appContent.tones.tonesOptions.map((tone) => (
                    <div key={tone.id} className="tone" onClick={() => definingPrompt(tone.id)}>
                        <p>{tone.id}</p>
                        <p>{tone.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SummaryPage