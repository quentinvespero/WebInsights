import { FC } from "react"
import ButtonWithIcon from "../ButtonWithIcon"
import { PageInterface } from "../../interfaces/appContentInterfaces"
import { styled } from "styled-components"

interface MenuBarItemProps {
    selected:boolean
    pageItem:PageInterface
}

const Style = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size:.75rem;
    
    .buttonWithIcon{
        display:flex;
        flex-direction: column;
        align-items: center;
        row-gap:.5rem;
    }
`

const MenuBarItem:FC<MenuBarItemProps> = ({selected, pageItem}) => {
    return (
        <Style className="menuBarItem">
            <ButtonWithIcon 
                text={pageItem.text} 
                imageName={pageItem.icon} 
                iconSize="1rem"
            />
            {selected && <div className="dot">•</div>}
        </Style>
    )
}

export default MenuBarItem