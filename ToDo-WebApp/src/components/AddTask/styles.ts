import styled from "styled-components";

export const Container = styled.div``;
export const Button = styled.button`
  font-size: x-large;
  padding: 0px;
  border-radius: 50px;
  border: 0px;
  width: 25px;
  height: 25px;
  transition: transform 0.3s ease;
  font-family: auto;
  margin-bottom: 5px;
  &:hover {
    color: green;
    cursor: pointer;
    border: 1px solid green;
    transform: scale(1.1);
  }
  svg {
    width: 25px;
    height: 25px;
  }
`;
