import { useQuery } from "react-query";
import api from "../services/Api";
import { AxiosPromise } from "axios";
import { Task } from "../interfaces/Task";

const endPointGetAll = "api/task-list";

const onGetAllTasks = async (): AxiosPromise<Task[]> => {
    const response = await api.get<Task[]>(endPointGetAll);
    return response;
  };

export function useTaskData(){
    const query = useQuery({
     queryFn: onGetAllTasks,
     queryKey:['tasks-data']
    })
    return {...query, data: query.data?.data};
  }