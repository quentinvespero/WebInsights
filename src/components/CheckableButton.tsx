import { FC } from "react"

interface CheckableButtonProps {
    selected:boolean
    children:React.ReactNode
}

const CheckableButton:FC<CheckableButtonProps> = ({selected, children}) => {
    return (
        <div className={`checkableButton ${selected ? 'checkableButton-selected' : ''}`}>
            {children}
        </div>
    )
}

export default CheckableButton