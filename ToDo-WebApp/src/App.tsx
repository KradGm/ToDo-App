import { useCallback, useEffect, useState } from "react";
import "./App.css";
import * as Components from "./App.styles";
import { Task } from "./model/Task";
import { TaskComp } from "./components/Task";
import { AddTask } from "./components/AddTask";
import { InputComp } from "./components/Input";
import {
  onDelete,
  onGetAllTasks,
  onGetByNameList,
  onPatch,
  onPost,
} from "./services/Api";

const App = () => {
  const [list, setList] = useState<Task[]>([]);

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
      const newTask = await onPost(data);
      setList((prevList) => [...prevList, newTask]);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onRequestPatch = useCallback(async (data: Task) => {
    try {
      await onPatch(data);
      setList(await onGetAllTasks());
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
    }
  }, []);

  useEffect(() => {
    fetchTaskList();
  }, [setList, fetchTaskList]);

  return (
    <Components.Container>
      <Components.Area>
  
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
