import { useCallback, useState } from "react";
import { useTaskData } from './hooks/useTaskData';
//Componentes
import { Task } from "./interfaces/Task";
import { TaskComp } from "./components/Task";
import { AddTask } from "./components/AddTask";
import { InputComp } from "./components/Input";
import { AlertComp } from "./components/Alert";

//Services
import {apiService} from "./services/Api";

//Styles
import "./App.css";
import * as Components from "./App.styles";

const App = () => {
  const [list, setList] = useState<Task[]>([]);
  const { data } =  useTaskData();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);

  const onRequestGetByName = useCallback(async (name: string) => {
    try {
      setList(await apiService.onGetByNameList(name));
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onRequestPost = useCallback(async (data: Task) => {
    try {
      const newTask = await apiService.onPost(data);
      setList((prevList) => [...prevList, newTask]);
      setSuccess(true);
    } catch (error) {
      setError(true);
    }
  }, []);

  const onRequestPatch = useCallback(async (data: Task) => {
    try {
      const updatedTask = await apiService.onPatch(data);
      setList((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
      setEditSuccess(true);
    } catch (error) {
      setError(true);
    }
  }, []);

  const onRequestDelete = useCallback(async (taskid: number) => {
    try {
      await apiService.onDelete(taskid);
      setList((prevTasks) => prevTasks.filter((task) => task.id !== taskid));
    } catch (error) {
      console.error(error);
      setError(true);
    }
  }, []);

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
        {editSuccess && (
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
        {data?.map((task) => (
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
