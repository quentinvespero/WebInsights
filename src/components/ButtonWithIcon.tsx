import { FC } from "react"

export interface ButtonWithImageProps {
    text?: string
    imageName?: string
    className?:string
    description?:string
    style?:React.CSSProperties
    iconSize?:string
}

////////////////////////////////////////////
// Guide Props
////////////////////////////////////////////
// imageName : give full name of file. Exemple : image1.png
// text : 
// description : if given, will show up a span element containing the description text
// className : can give the name of the component in which it is, so it will be named as such "buttonWithIcon-componentName"
// iconSize : width of the image

const ButtonWithIcon:FC<ButtonWithImageProps> = ({imageName, text, description, className, style, iconSize }) => {

    // path of the assets
    const assetPath = './assets/'

    // just to simplify the code, checking whether or not the description is given
    const descriptionText = description ? description : text

    // defining the classes to apply
    // const classesToApply = () => {
    //     let classes = 'buttonWithIcon'
    //     if (className) classes += ` ${className}`
    //     return classes
    // }

    // determining which path to give to the assets depending on whether it is an icon (svg) or image (other formats)
    const pathToApply = () => {
        let path = assetPath

        if (imageName) {
            if (imageName.includes('svg')) path += 'icons/'
            else path += 'imgs/'
        }

        return path
    }

    const styleToApply = {
        parent:{
            display:'flex'
        },
        image:{
            width: iconSize ? iconSize : '1rem'
        },
        text:{
            
        }
    }
    
    // console.log('-------ButtonWithImage',imageName,text, descriptionText)
    
    return (
        <div className={`buttonWithIcon ${className}`} style={{...style,...styleToApply}} >
            {imageName && <img style={styleToApply.image} src={`${pathToApply()}${imageName}`} alt={descriptionText}/>}
            {text && <p>{text}</p>}
            {description && <span>{description}</span>}
        </div>
    )
}

export default ButtonWithIcon