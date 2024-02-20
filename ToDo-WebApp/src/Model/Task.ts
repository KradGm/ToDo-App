import { Status } from "./Status";

export type Task = {
    id: number;
    taskName: string;
    status: Status;
    description: String;
}