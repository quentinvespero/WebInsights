import { Suspense, useState } from "react"
import content from "../public/assets/content.json"
import PageComponent from "./pages/PageComponent"
import MenuBar from "./components/menuBar/MenuBar"
import { colorsVariables } from "./style/variables"
import SummaryComponent from "./components/SummaryComponent"
import { ErrorBoundary } from "react-error-boundary"

const App = () => {

    const [language, setLanguage] = useState<'fr' | 'en'>("en")

    const appContent = content[language]

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

            {appContent.pages.map((page) => (
                <PageComponent key={page.id} appContent={appContent} page={page} />
            ))}

            {/* <ErrorBoundary fallback={<p>error</p>}>
                <Suspense fallback={<p>loading</p>}>
                    <SummaryComponent appContent={appContent}/>
                </Suspense>
            </ErrorBoundary> */}

            {/* <MenuBar appContent={appContent} /> */}
        </div>
    )
}

export default App
