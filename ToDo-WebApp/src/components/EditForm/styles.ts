import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    color: red;
    background-color: white;


`;

export const Modal = styled.div`
    opacity: 1;
    position: fixed;
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
    border-radius:20px;
    label{
        color:black;
        font-weight:700;
    }
    `;
    export const SaveButton = styled.button`
    font-size:x-large;   
    border-radius:50px;
    border:0px;
    transition: transform 0.3s ease;
    background-color:rgba(0, 0, 0, 0);

    &:hover {
        cursor: pointer;
        border: 1px solid blue;
        transform: scale(1.1);
      }
    `;

    export const CloseButton = styled.button`
    font-size:x-large;   
    border: 0px;
    position: relative;
    left: 5rem;
    bottom: 1rem;
    color:red;
    transition: transform 0.3s ease;
    background-color:rgba(0, 0, 0, 0);
    &:hover {
        cursor: pointer;
        border: 2px solid red;
        border-radius:50px;
        transform: scale(1.1);
      }
    `;