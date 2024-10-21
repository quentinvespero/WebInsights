import { useEffect, useState } from "react"
import content from "../public/assets/content.json"
import PageComponent from "./pages/PageComponent"
import MenuBar from "./components/menuBar/MenuBar"
import { colorsVariables } from "./style/variables"
import { Navigate, Route, Routes } from "react-router-dom"
import styled from "styled-components"

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

    const [language, setLanguage] = useState<'fr' | 'en'>("en")

    const appContent = content[language]

    // possibly retrieving a previously stored setting for the language
    useEffect(() => {

        // checking whether chrome object is accessible or not
        if (typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.sync.get('language', (result) => {
                if (result.language) {
                    setLanguage(result.language)
                }
            })
        }
        else {
            console.warn('chrome.storage is not available in the current environment')
        }
    }, [])

    return (
        <Style className="app">

            <Routes>

                {appContent.pages.map((page) => (
                    <Route 
                        key={page.id} 
                        path={page.id} 
                        element={<PageComponent appContent={appContent} page={page} setLanguage={setLanguage} language={language}/>}>
                    </Route>
                ))}

                <Route path="*" element={<Navigate to="/" replace />}/>

            </Routes>

            <MenuBar appContent={appContent} />
        </Style>
    )
}

export default App