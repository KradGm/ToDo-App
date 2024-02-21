import * as Component from './styles';
import { Task } from '../../Model/Task';
import api from '../../services/Api';
import { useState } from 'react';


type Props = {
    task: Task;
}

export const TaskComp = ({ task }: Props) => {
    const [status, setStatus] = useState(task.status.toString());


    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const statusNumerico = parseInt(event.target.value);
        setStatus(event.target.value);
        setStatus(statusNumerico.toString());
        try {
            api.put(`api/Task/${task.id}`, { id: task.id, taskName: task.taskName, status: statusNumerico, description: task.description })
            console.log(`Status atualizado para: ${task.status}`);
        }
        catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (taskid: number) => {
        const confirmAct = window.confirm("Você tem certeza disso?");

        if (confirmAct) {
            try {
                await api.delete(`/api/Task/${taskid}`);
            } catch (error) {
                console.error(error);
            }
        }
    }

    function handleEdit(task: Task) {
        
    }

    return (
        <Component.Container>
            <Component.Container>
                <select value={status} onChange={handleChange} >
                    <option value={0}>Concluido</option>
                    <option value={1}>Não iniciado</option>
                    <option value={2}>Em andamento</option>
                </select>
                <label>{task.taskName}</label>
                <p>{task.description}</p>
            </Component.Container>
            <Component.Container>
                <button onClick={() => handleEdit(task)}>✏️</button>
                <button onClick={() => handleDelete(task.id)}>🗑️</button>
            </Component.Container>
        </Component.Container>

    );
}