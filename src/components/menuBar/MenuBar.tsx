import { CSSProperties, FC } from "react"
import { AppContentProps } from "../../interfaces/globalProps"
import MenuBarItem from "./MenuBarItem"
import { Link } from "react-router-dom"
import ButtonWithIcon from "../ButtonWithIcon"
import { colorsVariables } from "../../style/variables"
import styled from "styled-components"

interface MenuBarProps {

}

const MenuBar:FC<MenuBarProps & AppContentProps> = (appContent) => {

    const Style = styled.div`
        display:flex;
        flex-direction:row;
        justify-content:center;
        align-items:center;
        column-gap:1rem;
        padding:1rem;
        
        a{
            transition:ease-in-out .1s;
            
            @media (hover:hover){
                &:hover{
                    transform:scale(.95);
                }
            }
            &:active{
                transform:scale(.92);
            }
        }

        .buttonWithIcon{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 0.5rem;
            border-radius: 0.5rem;
            background: var(--color3_dark);
            row-gap: 0.5rem;
        }
    `

    return (
        <Style className="menuBar">

            {/* mapping pages elements */}
            {appContent.appContent.pages.map(pageItem => (
                <Link to={pageItem.id} key={pageItem.id}>
                    {/* <MenuBarItem id={pageItem.id} text={pageItem.text}/> */}
                    <ButtonWithIcon text={pageItem.text} imageName={pageItem.icon} iconSize="2rem" />
                </Link>
            ))}

        </Style>
    )
}

export default MenuBar