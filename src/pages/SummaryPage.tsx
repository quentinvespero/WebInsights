import { Suspense, useContext } from "react"
import SummaryComponent from "../components/summary/SummaryComponent"
import { ErrorBoundary } from "react-error-boundary"
import { styled } from "styled-components"
import PromptSuggestionItem from "../components/summary/PromptSuggestionItem"
import FallbackError from "../components/fallbackComponents/FallbackError"
import FallbackLoading from "../components/fallbackComponents/FallbackLoading"
import { AppContentContext } from "../components/context/AppContentContextProvider"
import { colorsVariables } from "../style/variables"

const Style = styled.div `
    display:flex;
    flex-direction:column;
    row-gap:1rem;

    .summarySection {
        display:flex;
        flex-direction:column;
        padding:1rem;
        background:${colorsVariables.color4};
        border-radius:.5rem;
        box-shadow:0 0 .3rem ${colorsVariables.color4};
        border:solid .1rem ${colorsVariables.color3_dark};
    }
    
    .promptsSuggestions{
        display:flex;
        flex-direction:column;
        gap:1rem;
    }
`

const SummaryPage = () => {
    
    // const [selectedPromptObject, setSelectedPromptObject] = useState<PromptSuggestionInterface>(appContent.prompts.promptsSuggestions[promptId])

    // const {promptId} = useAppContext(GlobalContext)

    // const selectedPromptObject = appContent.prompts.promptsSuggestions[promptId]
    
    // const selectedPromptObject = useContext(AppContentContext).appContent.prompts.promptsSuggestions[promptId]

    // console.log(selectedPromptObject)

    const {appContent} = useContext(AppContentContext)

    return (
        <Style className="summaryPage">

            {/* <p>tone used for the summary : <strong>{selectedPromptObject.id}</strong></p> */}
            <div className="summarySection">
                <ErrorBoundary fallback={<FallbackError/>}>
                    <Suspense fallback={<FallbackLoading/>}>
                        <SummaryComponent/>
                    </Suspense>
                </ErrorBoundary>
            </div>
            
            <div className="promptsSuggestions">
                {appContent.prompts.promptsSuggestions.map((promptItem) => (
                    <PromptSuggestionItem key={promptItem.id} promptSuggestionItem={promptItem}/>
                ))}
            </div>
        </Style>
    )
}

export default SummaryPage