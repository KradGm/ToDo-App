import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    background-color: #05445E;
    padding: 10px;
    border-radius:10px;
    margin-bottom:10px;
    margin-top:10px;
    align-items:center;
    justify-content:space-between;
    label{
        color: #189AB4;
        margin-left:0.5rem;
        margin-right:10px;
        font-weight:800;
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
    background-color:white;
    border:0px;
    border-radius:50px;
    font-size:x-large;
    transition: transform 0.3s ease;
    &:hover {
        cursor: pointer;
        border: 1px solid yellow;
        transform: scale(1.1);
      }
`;
export const ButtonDelete = styled.button`
    margin-left:5px;
    background-color:white;
    border:0px;
    border-radius:50px;
    font-size:x-large;
    transition: transform 0.3s ease;
    &:hover {
        cursor: pointer;
        border: 1px solid red;
        transform: scale(1.1);
      }
`;
