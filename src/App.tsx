import { Suspense, useState } from "react"
import content from "../public/assets/content.json"
import PageComponent from "./pages/PageComponent"
import MenuBar from "./components/menuBar/MenuBar"
import { colorsVariables } from "./style/variables"
import SummaryComponent from "./components/SummaryComponent"
import { ErrorBoundary } from "react-error-boundary"
import { Navigate, Route, Routes } from "react-router-dom"

const App = () => {

    const [language, setLanguage] = useState<'fr' | 'en'>("en")

    const appContent = content[language]

    // const location = useLocation()

    const style = {
        container: {
            display: "flex",
            justifyContent: "center",
            flexDirection: 'column' as React.CSSProperties['flexDirection'],
            alignItems: "center",
            backgroundColor: colorsVariables['color1'],
            color: colorsVariables['color2']
        }
    }

    return (
        <div style={style.container}>

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
        </div>
    )
}

export default App
