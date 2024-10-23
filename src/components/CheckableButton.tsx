import { FC } from "react"
import styled from "styled-components"
import { ButtonType1 } from "../style/styledComponents"
import { colorsVariables } from "../style/variables"

interface CheckableButtonProps {
    selected:boolean
    children:React.ReactNode
    className?:string
}

const Style = styled(ButtonType1)`
    &.checkableButton-selected{
        background:${colorsVariables.color4}
    }
`

const CheckableButton:FC<CheckableButtonProps> = ({selected, className, children}) => {
    return (
        <Style className={`checkableButton ${className} ${selected ? 'checkableButton-selected' : ''}`}>
            {children}
        </Style>
    )
}

export default CheckableButton