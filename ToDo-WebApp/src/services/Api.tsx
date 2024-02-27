import axios from "axios";
import { Task } from "../model/Task";


const endPointGetAll = "api/task-list";
const endPointPost = "api/tasks";

const api = axios.create({
  baseURL: "http://localhost:5287/",
});

export const onPost = async (data: Task) => {
    
  try {
    await api.post(endPointPost, data);
  } catch (error) {
    console.error(error);
    window.alert("Já existe uma tarefa com esse Nome");
  }
};

export const onGetAllTasks = async()=>{
  try{
  const response = await api.get(endPointGetAll);
  return response.data;
}catch(error){
  console.error(error);
}
};


export default api;