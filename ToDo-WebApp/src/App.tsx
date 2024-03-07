import { useCallback, useState } from "react";
import { useTaskData } from "./hooks/useTaskData";
// Componentes
import { Task } from "./interfaces/Task";
import { TaskComp } from "./components/Task";
import { AddTask } from "./components/AddTask";
import { InputComp } from "./components/Input";
import { AlertComp } from "./components/Alert";

// Services
import { apiService } from "./services/Api";

// Styles
import "./App.css";
import * as Components from "./App.styles";

const App = () => {
  const { data: tasks, isLoading, refetch, setTasks } = useTaskData();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const onRequestGetAll = useCallback(async (name: string) => {
    try {
      await setTasks(name);
    } catch (error) {
      console.error(error);
    }
  }, [setTasks]);

  const onRequestPost = useCallback(async (data: Task) => {
    try {
      await apiService.onPost(data);
      setSuccess(true);
      refetch();
    } catch (error) {
      const customError = error as ErrorCustom;
      setError(true);
      console.log(customError.response.data.errors.TaskName[0], "error");
      setMessage(customError.response.data.errors.TaskName[0]);
    }
  }, []);

  const onRequestPatch = useCallback(async (data: Task, taskName: string) => {
    try {
      await apiService.onPut(data, taskName);
      setEditSuccess(true);
      refetch();
    } catch (error) {
      setError(true);
    }
  }, []);

  const onRequestDelete = useCallback(async (taskid: number) => {
    try {
      await apiService.onDelete(taskid);
      refetch();
    } catch (error) {
      console.error(error);
      setError(true);
    }
  }, []);

  return (
    <Components.Container>
      <Components.Area>
        {error && (
          <AlertComp message={message} setError={setError} type="error" />
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
        <InputComp onRequestGetByName={onRequestGetAll} />
        <AddTask
          onRequestPatch={onRequestPatch}
          onRequestPost={onRequestPost}
        />
        {!isLoading && (
          <>
            {tasks?.map((task) => (
              <TaskComp
                onRequestDelete={onRequestDelete}
                onRequestPatch={onRequestPatch}
                onRequestPost={onRequestPost}
                key={task.id}
                task={task}
              />
            ))}
          </>
        )}
        {isLoading && <p>carregando</p>}
      </Components.Area>
    </Components.Container>
  );
};

export default App;
