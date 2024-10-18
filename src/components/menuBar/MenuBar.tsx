import { CSSProperties, FC } from "react"
import { AppContentProps } from "../../interfaces/globalProps"
import MenuBarItem from "./MenuBarItem"
import { Link } from "react-router-dom"
import ButtonWithIcon from "../ButtonWithIcon"
import { colorsVariables } from "../../style/variables"
import styled from "styled-components"
import { StyledButton } from "../../style/styledComponents"

interface MenuBarProps {

}

const MenuBar:FC<MenuBarProps & AppContentProps> = (appContent) => {

    const Style = styled.div`
        display:flex;
        flex-direction:row;
        justify-content:center;
        align-items:center;
        column-gap:2rem;
        padding:1rem;
        width:100%;

        .buttonWithIcon{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 0.5rem;
            border-radius: 0.5rem;
            row-gap: 0.5rem;
            border:solid .1rem ${colorsVariables.color3_dark};
        }
    `

    return (
        <Style className="menuBar">

            {/* mapping pages elements */}
            {appContent.appContent.pages.map(pageItem => (
                <Link to={pageItem.id} key={pageItem.id}>
                    <StyledButton>
                        <ButtonWithIcon text={pageItem.text} imageName={pageItem.icon} iconSize="2rem" />
                    </StyledButton>
                </Link>
            ))}

        </Style>
    )
}

export default MenuBar