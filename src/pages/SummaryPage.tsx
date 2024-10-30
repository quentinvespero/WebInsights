import { FC, Suspense } from "react"
import SummaryComponent from "../components/summary/SummaryComponent"
import { AppContentProps } from "../interfaces/globalProps"
import { ErrorBoundary } from "react-error-boundary"
import { styled } from "styled-components"
import useAppContext from "../components/context/useAppContext"
import { GlobalContext } from "../components/context/ContextProvider"
import PromptSuggestionItem from "../components/summary/PromptSuggestionItem"

interface SummaryPageProps {
    
}

const Style = styled.div `
    display:flex;
    flex-direction:column;
    row-gap:1rem;
    
    .promptsSuggestions{
        display:flex;
        flex-direction:column;
        gap:1rem;
    }
`

const SummaryPage:FC<SummaryPageProps & AppContentProps> = ({appContent}) => {
    
    // const [selectedPromptObject, setSelectedPromptObject] = useState<PromptSuggestionInterface>(appContent.prompts.promptsSuggestions[promptId])

    const {promptId} = useAppContext(GlobalContext)

    const selectedPromptObject = appContent.prompts.promptsSuggestions[promptId]

    return (
        <Style className="summaryPage">

            {/* <p>tone used for the summary : <strong>{selectedPromptObject.id}</strong></p> */}
            
            <ErrorBoundary fallback={<p>error</p>}>
                <Suspense fallback={<p>loading</p>}>
                    <SummaryComponent prompt={selectedPromptObject.prompt}/>
                </Suspense>
            </ErrorBoundary>
            
            <div className="promptsSuggestions">
                {appContent.prompts.promptsSuggestions.map((promptItem) => (
                    <PromptSuggestionItem key={promptItem.id} promptSuggestionItem={promptItem}/>
                ))}
            </div>
        </Style>
    )
}

export default SummaryPage