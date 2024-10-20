import { FC } from "react"
import { PageInterface } from "../interfaces/appContentInterfaces"
import SummaryPage from "./SummaryPage"
import { AppContentProps } from "../interfaces/globalProps"
import styled from "styled-components"

interface PageComponentProps {
    page: PageInterface
}

const Style = styled.div`
    width:80%;
`

const PageComponent:FC<PageComponentProps & AppContentProps> = ({ appContent, page }) => {


    return (
        <Style className='pageComponent'>

            <h1>{page.text}</h1>

            {page.id === '' && <SummaryPage appContent={appContent}/>}
            
            {/* {page.id === 'translations'}
            {page.id === 'settings'} */}
            
        </Style>
    )
}

export default PageComponent