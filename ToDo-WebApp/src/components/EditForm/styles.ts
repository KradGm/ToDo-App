import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    color: red;
    background-color: white;


`;

export const Modal = styled.div`

    background-color: white;
    display: flex;
    position: fixed;
    width: 300px;
    height: 300px;
    color: black;
    border-radius:15px; 
    vertical-align: middle;
    
    `;
    export const EditForm = styled.form`
    width: 100%;
    height:100%;
    display: flex;
    justify-items: center;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;

    input{
        margin-bottom:1.25rem;
    }
    label{
        color:black;
        font-weight:800;
    }
    `;

    export const SaveButton = styled.button`
    background-color:green;
    font-size:larger;
    border-radius:50px;
    margin-top:1.25rem;
    `;