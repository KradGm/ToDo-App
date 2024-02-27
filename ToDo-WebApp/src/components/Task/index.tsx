import * as Component from "./styles";
import { Task } from "../../model/Task";
import api from "../../services/Api";
import { useCallback, useState } from "react";
import { EditForm } from "../EditForm";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Select } from "antd";

type Props = {
  task: Task;
  handlerUpdate: () => void;
  error:boolean;
};

export const TaskComp = ({ task, handlerUpdate, error }: Props) => {
  const [status, setStatus] = useState(task.status.toString());
  const [showEditForm, setShowEditForm] = useState(false);

  const handleChange = useCallback(
    async (value: number) => {
      setStatus(value.toString());
      try {
        await api.put(`api/tasks/${task.id}`, {
          id: task.id,
          taskName: task.taskName,
          status: value,
        });
        console.log(`Status atualizado para: ${status}`);
      } catch (error) {
        console.error(error);
      }
      console.log({ id: task.id, status: value });
    },
    [status, task.id, task.taskName]
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
        handlerUpdate();
      }
    },
    [handlerUpdate]
  );

  const handleClick = useCallback(() => {
    setShowEditForm(true);
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
        {showEditForm ? (
          <EditForm
            showError={error}
            handlerUpdate={handlerUpdate}
            setShow={setShowEditForm}
            key={task.id}
            task={task}
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
