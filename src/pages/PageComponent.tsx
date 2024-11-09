import { FC, useContext } from "react"
import { PageInterface } from "../interfaces/appContentInterfaces"
import SummaryPage from "./SummaryPage"
import { AppContentProps } from "../interfaces/globalProps"
import styled from "styled-components"
import SettingsPage from "./SettingsPage"
import { ApiContext } from "../components/context/ApiContextProvider"
import { colorsVariables } from "../style/variables"

interface PageComponentProps {
    page: PageInterface
}

const Style = styled.div`
    width:85%;
    padding-bottom:10rem;

    & > .popup{
        padding:.5rem 1rem;
        margin-top:1rem;
        background:orange;
        border-radius:.5rem;
        color:black;
        border: dashed .15rem ${colorsVariables.color_transparent_dark};
    }
`

const PageComponent:FC<PageComponentProps & AppContentProps> = ({ appContent, page }) => {

    const {partialApiKey} = useContext(ApiContext)

    return (
        <Style className='pageComponent'>

            {/* checking whether the api key has been provided */}
            {partialApiKey.length < 4 && <p className="popup">{appContent.popupMessages.apiKeyEmpty}</p>}

            <h1>{page.text}</h1>

            {page.id === 'summary' && <SummaryPage/>}
            
            {/* {page.id === 'translations'} */}
            {page.id === 'settings' && <SettingsPage/>}
            
        </Style>
    )
}

export default PageComponent