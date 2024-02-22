import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    color: red;
    background-color: white;


`;

export const Modal = styled.div`
    opacity: 1;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(77, 77, 77, 0.5);
    transition: all 0.4s;
    `;
    
    export const EditForm = styled.form`
    padding: 1.1rem;
    display: flex;
    justify-items: center;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    background-color:white;
    top:

    input{
        margin-bottom:1.25rem;
    }
    label{
        color:black;
        font-weight:800;
    }
    `;

    export const SaveButton = styled.button`
    font-size:x-large;   
    border-radius:50px;
    border:0px;
    margin-top:1.25rem;
    transition: transform 0.3s ease;
    &:hover {
        cursor: pointer;
        border: 1px solid red;
        transform: scale(1.1);
      }
    `;

    export const CloseButton = styled.button`
    font-size:x-large;   
    border: 0px;
    position: relative;
    left: 3.8rem;
    bottom: 1rem;
    color:red;
    background-color:white;
    transition: transform 0.3s ease;
    &:hover {
        cursor: pointer;
        border: 1px solid red;
        transform: scale(1.1);
      }
    `;