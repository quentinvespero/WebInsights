import { FC } from "react"
import { AppContentProps } from "../../interfaces/globalProps"
import { Link, useLocation } from "react-router-dom"
import ButtonWithIcon from "../ButtonWithIcon"
import { colorsVariables } from "../../style/variables"
import styled from "styled-components"
import { StyledButtonBehaviour } from "../../style/styledComponents"

interface MenuBarProps {

}

const Style = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    column-gap:2rem;
    padding:.5rem 0rem;
    margin-bottom:.3rem;
    background:${colorsVariables.color_transparent};
    border:.15rem solid ${colorsVariables.color3_dark};
    backdrop-filter:blur(3rem);
    width:93%;
    border-radius:1rem;
    position:fixed;
    bottom:0;
    z-index:1;
    overflow-x:scroll;
    box-shadow:0 0 3rem 0 ${colorsVariables.color4};
    
    .menuBarItem{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0.2rem 0.7rem;
        border-radius: 0.5rem;
        row-gap: 0.5rem;
        /* border:solid .1rem ${colorsVariables.color3_dark}; */
        /* background:${colorsVariables.color3_dark}; */
        font-size:.75rem;
    }
    .menuBarItem-selected{
        /* border:.15rem solid ${colorsVariables.color3_dark}; */
        box-shadow:0rem 0rem 0rem .1rem ${colorsVariables.color3_dark};
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
                    <StyledButtonBehaviour>
                        <ButtonWithIcon 
                            text={pageItem.text} 
                            imageName={pageItem.icon} 
                            iconSize="1.7rem"
                            className={`menuBarItem ${'/'+pageItem.id === currentLocation.pathname ? 'menuBarItem-selected' : ''}`}
                        />
                    </StyledButtonBehaviour>
                </Link>
            ))}

        </Style>
    )
}

export default MenuBar