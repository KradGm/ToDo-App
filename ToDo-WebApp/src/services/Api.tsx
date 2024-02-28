import axios from "axios";
import { Task } from "../model/Task";

const endPointGetAll = "api/task-list";
const endPointPost = "api/tasks";
const endPointPatch = "api/tasks/";

const api = axios.create({
  baseURL: "http://localhost:5287/",
});

export const onPost = async (data: Task) => {
  try {
    const response = await api.post(endPointPost, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const onGetAllTasks = async () => {
  try {
    const response = await api.get(endPointGetAll);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
//patch

export const onPatch = async (data: Task) => {
  try {
    await api.patch<Task>(`${endPointPatch}${data.id}`, {
      id: data.id,
      taskName: data.taskName,
      status: data.status,
      description: data.description,
    });
    console.log(`Status atualizado para: ${data.id}`);
  } catch (error) {
    console.error(error);
  }
};

//delete
export const onDelete = async (taskid: number) => {
  const confirmAct = window.confirm("Você tem certeza disso?");
  if (confirmAct) {
    try {
      await api.delete(`/api/tasks/${taskid}`);
    } catch (error) {
      console.error(error);
    }
  }
};

export default api;
