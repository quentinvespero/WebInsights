import styled from "styled-components";
import { colorsVariables } from "./variables";

// button classic behaviour
export const StyledButtonBehaviour = styled.div`
    transition:ease-in-out .1s;
    cursor:pointer;
    
    @media (hover:hover){
        &:hover{
            filter:opacity(.7);
        }
    }
    &:active{
        transform:scale(.95);
    }
`

// below, ButtonType1 include the properties set in Styled StyledButtonBehaviour + its own properties
export const ButtonType1 = styled(StyledButtonBehaviour)`
    padding:.2rem 1rem;
    border-radius:.5rem;
    background:${colorsVariables.color3_dark};
    align-items:center;
    justify-content:center;
    /* cursor:pointer; */
    border:solid .1rem ${colorsVariables.color3_dark};
`