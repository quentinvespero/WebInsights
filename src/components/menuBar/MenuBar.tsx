import { CSSProperties, FC } from "react"
import { AppContentProps } from "../../interfaces/globalProps"
import MenuBarItem from "./MenuBarItem"
import { Link } from "react-router-dom"
import ButtonWithIcon from "../ButtonWithIcon"
import { colorsVariables } from "../../style/variables"

interface MenuBarProps {

}

const MenuBar:FC<MenuBarProps & AppContentProps> = (appContent) => {

    const style = {
        parent: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            columnGap:'1rem'
        },
        child: {
            display:'flex',
            flexDirection:'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            borderRadius: '.5rem',
            background: colorsVariables.color3_dark
        }
    } as const // using as const here enable to treat parent and child object in there as a proper const.

    return (
        <div style={style.parent} className="menuBar">

            {/* mapping pages elements */}
            {appContent.appContent.pages.map(pageItem => (
                <Link to={pageItem.id} key={pageItem.id}>
                    {/* <MenuBarItem id={pageItem.id} text={pageItem.text}/> */}
                    <ButtonWithIcon text={pageItem.text} imageName={pageItem.icon} style={style.child} iconSize="2rem" />
                </Link>
            ))}

        </div>
    )
}

export default MenuBar