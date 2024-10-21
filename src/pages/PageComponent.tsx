import { FC } from "react"
import { PageInterface } from "../interfaces/appContentInterfaces"
import SummaryPage from "./SummaryPage"
import { AppContentProps, LanguageProps, PromptsProps } from "../interfaces/globalProps"
import styled from "styled-components"
import SettingsPage from "./SettingsPage"

interface PageComponentProps {
    page: PageInterface
}

const Style = styled.div`
    width:85%;
    padding-bottom:6rem;
`

const PageComponent:FC<PageComponentProps & AppContentProps & LanguageProps & PromptsProps> = ({ appContent, page, setLanguage, language, promptId, setPromptId }) => {


    return (
        <Style className='pageComponent'>

            <h1>{page.text}</h1>

            {page.id === 'summary' && <SummaryPage appContent={appContent} promptId={promptId} setPromptId={setPromptId}/>}
            
            {/* {page.id === 'translations'} */}
            {page.id === 'settings' && <SettingsPage appContent={appContent} setLanguage={setLanguage} language={language} />}
            
        </Style>
    )
}

export default PageComponent