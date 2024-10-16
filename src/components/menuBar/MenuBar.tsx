import { FC } from "react"
import { AppContentProps } from "../../interfaces/globalProps"
import MenuBarItem from "./MenuBarItem"
import { Link } from "react-router-dom"

interface MenuBarProps {

}

const MenuBar:FC<MenuBarProps & AppContentProps> = (appContent) => {

    const style = {

    }

    return (
        <div style={style}>
            {appContent.appContent.pages.map((page) => (
                <div key={page.id} className="test">{page.text}</div>
            ))}

            {/* mapping pages elements */}
            <div>
                {appContent.appContent.pages.map(pageItem => (
                        <Link to={pageItem.id}key={pageItem.id}>
                            <MenuBarItem key={pageItem.id} id={pageItem.id} text={pageItem.text}/>
                        </Link>
                ))}
            </div>
        </div>
    )
}

export default MenuBar