import { FC } from "react"
import { AppContentProps } from "../../interfaces/globalProps"
import { Link, useLocation } from "react-router-dom"
import { colorsVariables } from "../../style/variables"
import styled from "styled-components"
import { StyledButtonBehaviour } from "../../style/styledComponents"
import MenuBarItem from "./MenuBarItem"

interface MenuBarProps {

}

const Style = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    column-gap:2rem;
    /* padding:.5rem 0rem; */
    padding-top:.7rem;
    background:${colorsVariables.color_transparent_dark};
    border-top:.15rem solid ${colorsVariables.color3_dark};
    backdrop-filter:blur(2rem);
    width:100%;
    position:fixed;
    bottom:0;
    z-index:1;
    overflow-x:scroll;
    /* box-shadow:0 0 2rem 2.5rem ${colorsVariables.color_transparent_dark}; */
    align-items:flex-start;
`

const MenuBar:FC<MenuBarProps & AppContentProps> = (appContent) => {

    const currentLocation = useLocation()

    // console.log(currentLocation.pathname)

    return (
        <Style className="menuBar">

            {/* mapping pages elements */}
            {appContent.appContent.pages.map(pageItem => (
                <Link to={pageItem.id} key={pageItem.id}>
                    <StyledButtonBehaviour>
                        <MenuBarItem pageItem={pageItem} selected={'/'+pageItem.id === currentLocation.pathname ? true : false}/>
                    </StyledButtonBehaviour>
                </Link>
            ))}

        </Style>
    )
}

export default MenuBar