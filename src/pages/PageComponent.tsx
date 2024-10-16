import { FC } from "react"
import { PageInterface } from "../interfaces/appContentInterfaces"
import SummaryPage from "./SummaryPage"
import { AppContentProps } from "../interfaces/globalProps"

interface PageComponentProps {
    page: PageInterface
}

const PageComponent:FC<PageComponentProps & AppContentProps> = ({ appContent, page }) => {

    const style = {}

    return (
        <div style={style} className='pageComponent'>

            <h1>{page.text}</h1>

            {page.id === '' && <SummaryPage appContent={appContent}/>}
            
            {/* {page.id === 'translations'}
            {page.id === 'settings'} */}
            
        </div>
    )
}

export default PageComponent