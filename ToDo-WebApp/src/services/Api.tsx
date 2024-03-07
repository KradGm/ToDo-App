import axios from "axios";
import { Task } from "../interfaces/Task";

const endPointPost = "api/tasks";
const endPointPut = "api/tasks/";
const endPointDelete = "/api/tasks/";
const endPointGetAll = "api/task-list";

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
      throw error;
    }
  },
  //getByName
onGetAll:async (name: string) => {
  try {
    const response = await api.get(`${endPointGetAll}${name}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
},
//getAll

//patch
onPut: async (data: Task, taskName:string) => {
  try {
    await api.put<Task>(`${endPointPut}${taskName}`, {
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
