import * as Component from "./styles";
import { Task } from "../../model/Task";
import api from "../../services/Api";
import { useCallback, useState } from "react";
import { EditForm } from "../EditForm";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Select } from "antd";

type Props = {
  task: Task;
  error:boolean;
  onRequestPatch: (data:Task)=>void;
  onRequestPost:(data:Task)=>void;
};

export const TaskComp:React.FC<Props> = ({ task, error, onRequestPatch,onRequestPost }) => {
  const [show,setShowEditForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleChange = useCallback(
    async (value:any) => {
      console.log(value);
      try{
          onRequestPatch({id:task.id, taskName:task.taskName, status:value, description:task.description});
      }catch(error){
        console.log(error)
      }
    },
    []
  );

  const handleDelete = useCallback(
    async (taskid: number) => {
      const confirmAct = window.confirm("Você tem certeza disso?");
      if (confirmAct) {
        try {
          await api.delete(`/api/tasks/${taskid}`);
        } catch (error) {
          console.error(error);
        }
      }
    },
    []
  );

  const handleClick = useCallback(() => {
    console.log("abrir modal");
showModal();
console.log(isModalOpen);
}, []);

  return (
    <Component.Container>
      <Component.Container>
        <Select defaultValue={task.status} onChange={handleChange}>
          <Select.Option value={0}>Concluido</Select.Option>
          <Select.Option value={1}>Não iniciado</Select.Option>
          <Select.Option value={2}>Em andamento</Select.Option>
        </Select>
        <label>{task.taskName}</label>
        <p>{task.description}</p>
      </Component.Container>
      <Component.Container>
        <Component.ButtonEdit onClick={handleClick}>
          <EditFilled />
        </Component.ButtonEdit>
        {isModalOpen ? (
          <EditForm
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            showError={error}
            setShow={setShowEditForm}
            key={task.id}
            task={task}
            onRequestPatch={onRequestPatch}
            onRequestPost={onRequestPost}
          />
        ) : null}
        <Component.ButtonDelete
          onClick={() => {
            handleDelete(task.id);
          }}
        >
          <DeleteFilled />
        </Component.ButtonDelete>
      </Component.Container>
    </Component.Container>
  );
};
