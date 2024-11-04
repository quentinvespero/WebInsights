import { Suspense, useContext } from "react"
import PageComponent from "./pages/PageComponent"
import MenuBar from "./components/menuBar/MenuBar"
import { colorsVariables } from "./style/variables"
import { Navigate, Route, Routes } from "react-router-dom"
import styled from "styled-components"
import { ErrorBoundary } from "react-error-boundary"
import FallbackError from "./components/fallbackComponents/FallbackError"
import FallbackLoading from "./components/fallbackComponents/FallbackLoading"
import { AppContentContext } from "./components/context/AppContentContextProvider"

const Style = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    background:${colorsVariables.color1};
    color:${colorsVariables.color2};
    min-height:35rem;
    font-size: .85rem;
    width:100%;
`

const App = () => {

    // destructuring objects from the global context
    // const { language } = useAppContext(GlobalContext)
    // const { language } = useContext(GlobalContext)

    // app content, depending on the value of language (if it's set to french or english)
    // const appContent = content[language as keyof typeof content]

    const {appContent} = useContext(AppContentContext)

    // const {partialApiKey} = useContext(ApiContext)

    return (
        <Style className="app">

            <Routes>

                {appContent.pages.map((page) => (
                    <Route key={page.id} path={page.id} element={
                        <ErrorBoundary fallback={<FallbackError/>}>
                            <Suspense fallback={<FallbackLoading/>}>
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