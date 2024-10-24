import { Suspense, useEffect } from "react"
import content from "../public/assets/content.json"
import PageComponent from "./pages/PageComponent"
import MenuBar from "./components/menuBar/MenuBar"
import { colorsVariables } from "./style/variables"
import { Navigate, Route, Routes } from "react-router-dom"
import styled from "styled-components"
import { GlobalContext } from "./components/context/ContextProvider"
import useAppContext from "./components/context/useAppContext"
import { ErrorBoundary } from "react-error-boundary"

const Style = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    background:${colorsVariables.color1};
    color:${colorsVariables.color2};
    min-width:20rem;
    min-height:30rem;
`

const App = () => {

    // destructuring objects from the global context
    const { language } = useAppContext(GlobalContext)

    // const [language, setLanguage] = useState<LanguageProps['language']>("en")

    // app content, depending on the value of language (if it's set to french or english)
    const appContent = content[language as keyof typeof content]

    // set the prompt to use, based on its ID
    // const [promptId, setPromptId] = useState<PromptsProps['promptId']>(0)

    // // retrieving a possibly stored setting for the language
    // useEffect(() => {

    //     // checking whether chrome object is accessible or not
    //     if (typeof chrome !== 'undefined' && chrome.storage) {
    //         chrome.storage.sync.get('language', (result) => {
    //             if (result.language) {
    //                 setLanguage(result.language)
    //             }
    //         })
    //         chrome.storage.sync.get('prompt', (result) => {
    //             if (result.prompt) {
    //                 setPromptId(result.prompt)
    //             }
    //         })
    //     }
    //     else console.warn('chrome.storage is not available in the current environment')
    // }, [])

    return (
        <Style className="app">

            <Routes>

                {appContent.pages.map((page) => (
                    <Route key={page.id} path={page.id} element={
                        <ErrorBoundary fallback={<p>error</p>}>
                            <Suspense fallback={<p>loading</p>}>
                                <PageComponent appContent={appContent} page={page}/>
                            </Suspense>
                        </ErrorBoundary>
                    }/>
                ))}

                <Route path="*" element={<Navigate to="summary" replace />}/>

            </Routes>

            <MenuBar appContent={appContent} />
        </Style>
    )
}

export default App