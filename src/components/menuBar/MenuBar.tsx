import { FC } from "react"
import { AppContentProps } from "../../interfaces/globalProps"

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
        </div>
    )
}

export default MenuBar