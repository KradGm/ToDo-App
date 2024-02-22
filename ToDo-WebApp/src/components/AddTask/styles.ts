import styled from "styled-components";

export const Container = styled.div`

`;
export const Button = styled.div`
    font-size:x-large;
    padding: 2px;
    border-radius:50px;
    width:25px;
    height:25px;
    transition: transform 0.3s ease;

    &:hover {
        color:green;
        cursor: pointer;
        border: 1px solid green;
        transform: scale(1.1);
      }
`;