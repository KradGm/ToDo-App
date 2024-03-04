import axios from "axios";
import { Task } from "../interfaces/Task";

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

//patch
onPatch: async (data: Task) => {
  try {
    await api.put<Task>(`${endPointPatch}${data.id}`, {
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
