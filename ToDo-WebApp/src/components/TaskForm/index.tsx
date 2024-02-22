import {  Button, Input } from 'antd';
import api from '../../services/Api';
import * as Component from './styles';
import { FormEvent } from 'react';
import TextArea from 'antd/es/input/TextArea';

export const TaskForm = () => {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const taskName = formData.get("taskName");
        let taskStatus = formData.get("status");
        const description = formData.get("description");
        taskStatus = taskStatus ? taskStatus.toString() : "";

        try {
            const response = await api.post('api/tasks', { taskName: taskName, status: parseInt(taskStatus), description: description });
            const newTask = response.data;
            console.log(newTask);
        } catch (error) {
            console.error(error);
        }


    };
    return (
        <Component.Container>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome da Tarefa:
                    <br />
                    <Input type="text" name="taskName"  required/>
                </label>
                <br />
                <label>
                    Status da Tarefa:
                    <br />
                    <select name="status" required>
                        <option value="0">Concluido</option>
                        <option value="1">Não iniciado</option>
                        <option value="2">Em andamento</option>
                    </select>
                </label>
                <br />
                <label>
                    Descrição:
                    <br />
                    <TextArea name="description" rows={4} placeholder="O maximo de  caracteres é 20" maxLength={20} />
                </label>
                <br />
                <Component.Button>Criar</Component.Button>
            </form>
        </Component.Container>
    );
}