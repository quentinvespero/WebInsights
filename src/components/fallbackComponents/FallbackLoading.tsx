import { colorsVariables } from "../../style/variables"
import ButtonWithIcon from "../ButtonWithIcon"

const FallbackLoading = () => {

    const style = {
        container: {
            background:colorsVariables.color3_dark,
            display:'flex',
            alignSelf:'center',
            padding:'.5rem 2rem',
            borderRadius:'5rem',
            margin:'2rem 0rem',
            transition:'.15s'
        }
    }

    return (
        <div className="fallbackLoading fallbackComponent" style={style.container}>
            <ButtonWithIcon imageName="" text="loading..." />
        </div>
    )
}

export default FallbackLoading