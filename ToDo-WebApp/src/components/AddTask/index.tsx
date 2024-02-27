import { PlusCircleFilled } from "@ant-design/icons";
import { TaskForm } from "../TaskForm";
import * as Component from "./styles";
import { useState } from "react";
type Props = {
  handlerUpdate: () => void;
};

export const AddTask = ({ handlerUpdate }: Props) => {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(!showForm);
  };

  return (
    <Component.Container>
      <Component.Button onClick={handleClick}>
        <PlusCircleFilled />
      </Component.Button>
      {showForm && <TaskForm handlerUpdate={handlerUpdate}/>}
    </Component.Container>
  );
};
