import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    background-color: #616161;
    padding: 10px;
    border-radius:10px;
    margin-bottom:10px;
    margin-top:10px;
    align-items:center;
    justify-content:space-between;
    label{
        color: #CCC;

        margin-right:10px;
    }
    p{
        color: #ffffff
    }
    button{
        width:50px;
        height:50px;
    }
`;

export const ButtonEdit = styled.button`
    background-color:yellow;
    border-radius:50px;
    font-size:larger;

`;
export const ButtonDelete = styled.button`
    background-color:white;
    border-radius:50px;
    font-size:larger;

`;
