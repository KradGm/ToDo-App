import { Task } from "../../interfaces/Task";
import { useCallback, useEffect, useState } from "react";
import { EditForm } from "../EditForm";

//Styles
import * as Component from "./styles";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Select } from "antd";
import { Status } from "../../interfaces/Status";

type Props = {
  task: Task;
  onRequestPatch: (data: Task) => void;
  onRequestPost: (data: Task) => void;
  onRequestDelete: (id: number) => void;
};

export const TaskComp: React.FC<Props> = ({
  task,
  onRequestPatch,
  onRequestPost,
  onRequestDelete
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState(task.status);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleChange = useCallback(async (value: Status) => {
    console.log(value);
    try {
      onRequestPatch({
        id: task.id,
        taskName: task.taskName,
        status: value,
        description: task.description,
      });
      setStatus(value);
      console.log(`Status atualizado para: ${value}`);
    } catch (error) {
      console.log(error);
    }
  }, [onRequestPatch, task]);

  const handleDelete = useCallback(async (taskid: number) => {
    const confirmAct = window.confirm("Você tem certeza disso?");
    if (confirmAct) {
      try {
        onRequestDelete(taskid);
        console.log(`A tarefa de Id:${taskid} foi removida`);
      } catch (error) {
        console.error(error);
      }
    }
  }, [onRequestDelete]);

  const handleClick = useCallback(() => {
    console.log("Abrir modal");
    showModal();
    console.log(isModalOpen);
  }, [isModalOpen]);

  useEffect(() => {
    setStatus(task.status);
  }, [task, status]);

  return (
    <Component.Container>
      <Component.Container>
        <Select
          defaultValue={status}
          onChange={handleChange}
          options={[
            { value: 0, label: <span>Concluido</span> },
            { value: 1, label: <span>Não Iniciado</span> },
            { value: 2, label: <span>Em Andamento</span> },
          ]}
        />
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
