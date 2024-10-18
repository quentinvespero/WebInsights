import { Suspense, useState } from "react"
import content from "../public/assets/content.json"
import PageComponent from "./pages/PageComponent"
import MenuBar from "./components/menuBar/MenuBar"
import { colorsVariables } from "./style/variables"
import SummaryComponent from "./components/SummaryComponent"
import { ErrorBoundary } from "react-error-boundary"
import { Navigate, Route, Routes } from "react-router-dom"
import styled from "styled-components"

const App = () => {

    const [language, setLanguage] = useState<'fr' | 'en'>("en")

    const appContent = content[language]

    const Style = styled.div`
        /* width:80%; */
        display:flex;
        justify-content:center;
        flex-direction:column;
        align-items:center;
        background:${colorsVariables.color1};
        color:${colorsVariables.color2};
    `

    return (
        <Style className="app">

            <Routes>

                {appContent.pages.map((page) => (
                    <Route 
                        key={page.id} 
                        path={page.id} 
                        element={<PageComponent appContent={appContent} page={page} />}>
                    </Route>
                ))}

                <Route path="*" element={<Navigate to="/" replace />}/>

            </Routes>

            <MenuBar appContent={appContent} />
        </Style>
    )
}

export default App
