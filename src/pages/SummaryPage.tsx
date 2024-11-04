import { FC, Suspense } from "react"
import SummaryComponent from "../components/summary/SummaryComponent"
import { AppContentProps } from "../interfaces/globalProps"
import { ErrorBoundary } from "react-error-boundary"
import { styled } from "styled-components"
import PromptSuggestionItem from "../components/summary/PromptSuggestionItem"
import FallbackError from "../components/fallbackComponents/FallbackError"
import FallbackLoading from "../components/fallbackComponents/FallbackLoading"

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

    // const {promptId} = useAppContext(GlobalContext)

    // const selectedPromptObject = appContent.prompts.promptsSuggestions[promptId]
    
    // const selectedPromptObject = useContext(AppContentContext).appContent.prompts.promptsSuggestions[promptId]

    // console.log(selectedPromptObject)

    return (
        <Style className="summaryPage">

            {/* <p>tone used for the summary : <strong>{selectedPromptObject.id}</strong></p> */}
            
            <ErrorBoundary fallback={<FallbackError/>}>
                <Suspense fallback={<FallbackLoading/>}>
                    <SummaryComponent/>
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