import styled from "styled-components";
import { colorsVariables } from "./variables";

// button classic behaviour
export const StyledButtonBehaviour = styled.div`
    transition:ease-in-out .1s;
    cursor:pointer;
    
    &:active{
        transform:scale(.95);
    }
`

// below, ButtonType1 include the properties set in Styled StyledButtonBehaviour + its own properties
export const ButtonType1 = styled(StyledButtonBehaviour)`
    display:flex;
    align-items:center;
    justify-content:center;
    padding:.2rem 1rem;
    border-radius:.5rem;
    background:${colorsVariables.color3_dark};
    border:solid .1rem ${colorsVariables.color3_dark};

    @media (hover:hover){
        &:hover{
            background:${colorsVariables.color_transparent_dark}
        }
    }
`