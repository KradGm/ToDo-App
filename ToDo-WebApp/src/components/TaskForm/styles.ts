import styled from "styled-components";

export const Container = styled.div`
  background-color: #ffffff;
  border-radius: 15px;
  padding: 10px;
  display: flex;
  justify-content: center;
  form button {
    margin-top: 10px;
  }
`;

export const Button = styled.button`
    border-radius: 1px;
    display:flex;
    &:hover {
        cursor: pointer;
        border: 1px solid red;
      }
`;
