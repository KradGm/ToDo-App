import axios from "axios";
import { Task } from "../model/Task";

const endPointGetAll = "api/task-list";
const endPointPost = "api/tasks";
const endPointPatch = "api/tasks/";
const endPointDelete = "/api/tasks/";
const endPointGetByName = "api/task-list/";

const api = axios.create({
  baseURL: "http://localhost:5287/",
});

export const apiService = {
  //post
  onPost: async (data: Task) => {
    try {
      const response = await api.post(endPointPost, data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  //getByName
onGetByNameList:async (name: string) => {
  try {
    const response = await api.get(`${endPointGetByName}${name}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
},
//getAll
onGetAllTasks: async () => {
  try {
    const response = await api.get(endPointGetAll);
    return response.data;
  } catch (error) {
    console.error(error);
  }
},
//patch
onPatch: async (data: Task) => {
  try {
    await api.patch<Task>(`${endPointPatch}${data.id}`, {
      id: data.id,
      taskName: data.taskName,
      status: data.status,
      description: data.description,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
},

//delete
onDelete: async (taskid: number) => {
  try {
    await api.delete(`${endPointDelete}${taskid}`);
  } catch (error) {
    console.error(error);
  }
}
}
 

export const Example = ()=>{
  
}

export default api;
