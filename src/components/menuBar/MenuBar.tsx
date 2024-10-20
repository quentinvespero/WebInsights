import { CSSProperties, FC } from "react"
import { AppContentProps } from "../../interfaces/globalProps"
import MenuBarItem from "./MenuBarItem"
import { Link, useLocation } from "react-router-dom"
import ButtonWithIcon from "../ButtonWithIcon"
import { colorsVariables } from "../../style/variables"
import styled from "styled-components"
import { StyledButton } from "../../style/styledComponents"

interface MenuBarProps {

}

const Style = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    column-gap:2rem;
    padding:1rem;
    width:100%;

    .menuBarItem{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0.5rem;
        border-radius: 0.5rem;
        row-gap: 0.5rem;
        border:solid .1rem ${colorsVariables.color3_dark};
        background:${colorsVariables.color3_dark};
    }
    .menuBarItem-selected{
        background:${colorsVariables.color4};
    }
`

const MenuBar:FC<MenuBarProps & AppContentProps> = (appContent) => {

    const currentLocation = useLocation()

    // console.log(currentLocation.pathname)

    return (
        <Style className="menuBar">

            {/* mapping pages elements */}
            {appContent.appContent.pages.map(pageItem => (
                <Link to={pageItem.id} key={pageItem.id}>
                    <StyledButton>
                        <ButtonWithIcon 
                            text={pageItem.text} 
                            imageName={pageItem.icon} 
                            iconSize="2rem"
                            className={`menuBarItem ${'/'+pageItem.id === currentLocation.pathname ? 'menuBarItem-selected' : ''}`}
                        />
                    </StyledButton>
                </Link>
            ))}

        </Style>
    )
}

export default MenuBar