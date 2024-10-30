import { Suspense, useContext } from "react"
import content from "../public/assets/content.json"
import PageComponent from "./pages/PageComponent"
import MenuBar from "./components/menuBar/MenuBar"
import { colorsVariables } from "./style/variables"
import { Navigate, Route, Routes } from "react-router-dom"
import styled from "styled-components"
import { GlobalContext } from "./components/context/ContextProvider"
import { ErrorBoundary } from "react-error-boundary"
import { ApiContext } from "./components/context/ApiContextProvider"
// import { ApiContext } from "./components/context/ApiContextProvider"

const Style = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    background:${colorsVariables.color1};
    color:${colorsVariables.color2};
    min-width:20rem;
    min-height:35rem;
    font-size: .85rem;

    & > .popup{
        padding:.5rem 2rem;
        margin-top:1rem;
        background:darkred;
        border-radius:.5rem;
    }
`

const App = () => {

    // destructuring objects from the global context
    // const { language } = useAppContext(GlobalContext)
    const { language } = useContext(GlobalContext)

    // app content, depending on the value of language (if it's set to french or english)
    const appContent = content[language as keyof typeof content]

    const {partialApiKey} = useContext(ApiContext)

    return (
        <Style className="app">

            {/* checking whether the api key has been provided */}
            {partialApiKey.length < 4 && <p className="popup">{appContent.popupMessages.apiKeyEmpty}</p>}

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