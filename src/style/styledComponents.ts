import styled from "styled-components";

// button classic behaviour
export const StyledButton = styled.div`
    transition:ease-in-out .1s;
    cursor:pointer;
    
    @media (hover:hover){
        &:hover{
            /* transform:scale(.95); */
            /* filter:contrast(1.5); */
            filter:opacity(.7);
        }
    }
    &:active{
        transform:scale(.95);
    }
`