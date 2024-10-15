import { FC } from "react"
import SummaryComponent from "../components/SummaryComponent"
import { AppContentProps } from "../interfaces/globalProps"

interface SummaryPageProps {

}

const SummaryPage:FC<SummaryPageProps & AppContentProps> = (appContent) => {
    return (
        <div>
            <SummaryComponent/>
        </div>
    )
}

export default SummaryPage