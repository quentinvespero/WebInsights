import { colorsVariables } from "../../style/variables"

const FallbackError = () => {

    // note 29/09/24 : the animation of it is in the .scss file, because using keyframe within component is tough
    const style = {
        container: {
            background:'darkred',
            display:'flex',
            alignSelf:'center',
            padding:'.5rem 2rem',
            borderRadius:'.5rem',
            margin:'2rem',
            transition:'.15s',
            placeSelf:'center',
            color:`${colorsVariables.color2}`,
            border: `dashed .15rem ${colorsVariables.color2}`,
            justifyContent:'center'
        },
        paragraph:{
            // fontSize:'.9rem'
        }
    }

    return (
        <div className="fallbackError fallbackComponent" style={style.container}>
            <p style={style.paragraph}>An error occured...</p>
        </div>
    )
}

export default FallbackError