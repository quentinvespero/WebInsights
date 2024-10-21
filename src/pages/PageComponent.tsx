import { FC } from "react"
import { PageInterface } from "../interfaces/appContentInterfaces"
import SummaryPage from "./SummaryPage"
import { AppContentProps, LanguageProps } from "../interfaces/globalProps"
import styled from "styled-components"
import SettingsPage from "./SettingsPage"

interface PageComponentProps {
    page: PageInterface
    // setLanguage: LanguageProps['setLanguage']

}

const Style = styled.div`
    width:85%;
    padding-bottom:6rem;
`

const PageComponent:FC<PageComponentProps & AppContentProps & LanguageProps> = ({ appContent, page, setLanguage, language }) => {


    return (
        <Style className='pageComponent'>

            <h1>{page.text}</h1>

            {page.id === '' && <SummaryPage appContent={appContent}/>}
            
            {/* {page.id === 'translations'} */}
            {page.id === 'settings' && <SettingsPage appContent={appContent} setLanguage={setLanguage} language={language} />}
            
        </Style>
    )
}

export default PageComponent