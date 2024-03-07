import { useState } from "react";
import { useQuery } from "react-query";
import api from "../services/Api";
import { AxiosPromise } from "axios";
import { Task } from "../interfaces/Task";

const endPointGetAll = "api/task-list";
const endPointGetByName = "api/task-list/";

const onGetAllTasks = async (): AxiosPromise<Task[]> => {
  const response = await api.get<Task[]>(endPointGetAll);
  return response;
};

const onGetTasksByName = async (name: string) => {
  const response = await api.get(`${endPointGetByName}${name}`);
  return response.data;
};

export function useTaskData() {
  const [tasksData, setTasksData] = useState<Task[]>([]);

  const query = useQuery({
    queryFn: onGetAllTasks,
    queryKey: ['tasks-data'],
    onSuccess: (data) => {
      setTasksData(data.data);
    },
  });

  const setTasks = async (name: string) => {
    try {
      const newData = await onGetTasksByName(name);
      setTasksData(newData);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    ...query,
    data: tasksData,
    setTasks,
  };
}