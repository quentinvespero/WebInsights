import { FC } from "react"
import { PageInterface } from "../interfaces/appContentInterfaces"
import SummaryPage from "./SummaryPage"
import { AppContentProps } from "../interfaces/globalProps"
import styled from "styled-components"
import SettingsPage from "./SettingsPage"

interface PageComponentProps {
    page: PageInterface
}

const Style = styled.div`
    width:85%;
    padding-bottom:10rem;
`

const PageComponent:FC<PageComponentProps & AppContentProps> = ({ appContent, page }) => {


    return (
        <Style className='pageComponent'>

            <h1>{page.text}</h1>

            {page.id === 'summary' && <SummaryPage appContent={appContent}/>}
            
            {/* {page.id === 'translations'} */}
            {page.id === 'settings' && <SettingsPage appContent={appContent} />}
            
        </Style>
    )
}

export default PageComponent