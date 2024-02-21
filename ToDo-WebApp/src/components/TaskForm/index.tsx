import api from '../../services/Api';
import * as Component from './styles';
import { FormEvent } from 'react';

export const TaskForm = () => {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const taskName = formData.get("taskName");
        const taskStatus = formData.get("taskStatus");
        const description = formData.get("description");

        try {
            const response = await api.post('api/Task', { taskName: taskName, taskStatus: taskStatus, description: description });
            const newTask = response.data;
            console.log(newTask);
        } catch (error) {
            console.error(error);
        }


        console.log({ taskName, taskStatus, description });
    };
    return (
        <Component.Container>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome da Tarefa:
                    <br />
                    <input type="text" name="taskName" required />
                </label>
                <br />
                <label>
                    Status da Tarefa:
                    <br />
                    <select name="taskStatus" required>
                        <option value="0">Concluido</option>
                        <option value="1">Não iniciado</option>
                        <option value="2">Em andamento</option>
                    </select>
                </label>
                <br />
                <label>
                    Descrição:
                    <br />
                    <textarea name="description" required />
                </label>
                <br />
                <Component.Button>Criar Tarefa</Component.Button>
            </form>
        </Component.Container>
    );
}