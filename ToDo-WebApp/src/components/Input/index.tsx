import { useCallback } from "react";

//Styles
import * as Component from "./styles";
import Search from "antd/es/input/Search";

interface InputCompProps {
  onRequestGetByName: (name: string) => void;
}

export const InputComp: React.FC<InputCompProps> = ({ onRequestGetByName }) => {
  
  const onSearch = useCallback(async (name: string) => {
    try {
      onRequestGetByName(name);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <Component.Container>
      <Search
        placeholder="Insira o nome da tarefa"
        onSearch={onSearch}
        enterButton
      />
    </Component.Container>
  );
};
