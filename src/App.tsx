import { useState } from "react"
import content from "../public/assets/content.json"
import PageComponent from "./pages/PageComponent"
import MenuBar from "./components/menuBar/MenuBar"
import { colorsVariables } from "./style/variables"

const App = () => {

    // const [color, setColor] = useState("grey")

    // const onClick = async () => {
        
    //     // get the current tab
    //     let [tab] = await chrome.tabs.query({active: true, currentWindow: true})
        
    //     // Ensure tab is defined before accessing tab.id
    //     if (tab) {

    //         // get the current url
    //         chrome.scripting.executeScript<string[], void>({
                
    //             // target the current tab
    //             target: {tabId: tab.id!},

    //             // this is needed because this script don't run on the same context as the extension app in chrome.
    //             // because of that, this script can't access the value of the state color by default 
    //             // With args, we can pass the value of the state color to the script
    //             args: [color],
                
    //             // function to execute
    //             func: (color) => {
    //                 document.body.style.backgroundColor = color
    //             }
    //         })
    //     }
    //     else {
    //         console.error("No active tab found.");
    //     }
    // }

    const [language, setLanguage] = useState<'fr'|'en'>("en")

    const appContent = content[language]

    const style = {
        container: {
            display: "flex",
            justifyContent: "center",
            flexDirection:'column' as React.CSSProperties['flexDirection'],
            alignItems: "center",
            backgroundColor: colorsVariables['color1'],
            color:colorsVariables['color2']
        }
    }

    return (
        <div style={style.container}>
            {/* <input type="color" onChange={(e) => setColor(e.currentTarget.value)} /> */}
            {/* <button onClick={onClick}>Click me</button> */}

            {appContent.pages.map((page) =>(
                <PageComponent key={page.id} appContent={appContent} page={page}/>
            ))}

            <MenuBar appContent={appContent}/>
        </div>
    )
}

export default App
