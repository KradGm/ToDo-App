import { Button } from "antd";
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
export const SaveButton = styled.div`
  font-size: x-large;
  border-radius: 50px;
  border: 0px;
  transition: transform 0.3s ease;
  background-color: rgba(0, 0, 0, 0);
  padding: 0;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;
export const ButtonA = styled(Button)`
    font-size: x-large;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    &:hover {
        cursor: pointer;
        border: 1px solid red;
        transform: scale(1.1);
    }
    .anticon.anticon-save{
      margin:0px;
    }
`;
