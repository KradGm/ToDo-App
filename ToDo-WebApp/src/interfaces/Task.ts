import { Status } from "./Status";

export interface Task {
    id: number,
    taskName: string,
    status: Status,
    description: string
}

export interface TaskResponse {
    data: Task[];
}
