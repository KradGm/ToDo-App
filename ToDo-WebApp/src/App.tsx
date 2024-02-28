import { useCallback, useEffect, useState } from "react";

//Componentes
import { Task } from "./model/Task";
import { TaskComp } from "./components/Task";
import { AddTask } from "./components/AddTask";
import { InputComp } from "./components/Input";
import { AlertComp } from "./components/Alert";

//Services
import {
  onDelete,
  onGetAllTasks,
  onGetByNameList,
  onPatch,
  onPost,
} from "./services/Api";

//Styles
import "./App.css";
import * as Components from "./App.styles";

const App = () => {
  const [list, setList] = useState<Task[]>([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [editSucces, setEditSuccess] = useState(false);

  const fetchTaskList = useCallback(async () => {
    try {
      setList(await onGetAllTasks());
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onRequestGetByName = useCallback(async (name: string) => {
    try {
      setList(await onGetByNameList(name));
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onRequestPost = useCallback(async (data: Task) => {
    try {
      await onPost(data);
      fetchTaskList();
      setSuccess(true);
    } catch (error) {
      setError(true);
    }
  }, []);

  const onRequestPatch = useCallback(async (data: Task) => {
    try {
      await onPatch(data);
      setList(await onGetAllTasks());
      setEditSuccess(true);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onRequestDelete = useCallback(async (taskid: number) => {
    try {
      await onDelete(taskid);
      setList(await onGetAllTasks());
    } catch (error) {
      console.error(error);
      setError(true);
    }
  }, []);

  useEffect(() => {
    fetchTaskList();
  }, [setList, fetchTaskList]);

  return (
    <Components.Container>
      <Components.Area>
        {error && (
          <AlertComp
            message="Ja existe uma tarefa com esse nome"
            setError={setError}
            type="error"
          />
        )}
        {success && (
          <AlertComp
            message="Tarefa postada com sucesso"
            setError={setSuccess}
            type="success"
          />
        )}
        {editSucces && (
          <AlertComp
            message="Tarefa atualizada com sucesso"
            setError={setEditSuccess}
            type="success"
          />
        )}
        <Components.Header>LISTA DE TAREFAS</Components.Header>
        <InputComp onRequestGetByName={onRequestGetByName} />
        <AddTask
          onRequestPatch={onRequestPatch}
          onRequestPost={onRequestPost}
        />
        {list.map((task) => (
          <TaskComp
            onRequestDelete={onRequestDelete}
            onRequestPatch={onRequestPatch}
            onRequestPost={onRequestPost}
            key={task.id}
            task={task}
          />
        ))}
      </Components.Area>
    </Components.Container>
  );
};

export default App;
