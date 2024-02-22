import * as Component from './styles';
import { Task } from '../../Model/Task';
import api from '../../services/Api';
import {  useEffect, useState } from 'react';
import { EditForm } from '../EditForm';
import React from 'react';


type Props = {
    task: Task;
}

export const TaskComp = ({ task }: Props) => {
    const [status, setStatus] = useState(task.status.toString());
    const [showEditForm, setShowEditForm] = useState(false);
    const editFormRef = React.useRef<HTMLDivElement>(null);

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
    const handleClick = () => {

        setShowEditForm(true);
    }

    const handleClickOutside = (event: MouseEvent) => {
            if (editFormRef.current && !editFormRef.current.contains(event.target as Node)) {
            setShowEditForm(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <Component.Container>
            <Component.Container>
                <select value={status} onChange={handleChange} >
                    <option value="0">Concluido</option>
                    <option value="1">Não iniciado</option>
                    <option value="2">Em andamento</option>
                </select>
                <label>{task.taskName}</label>
                <p>{task.description}</p>
            </Component.Container>
            <Component.Container>
                <Component.ButtonEdit onClick={handleClick}>✏️</Component.ButtonEdit>
                {showEditForm ?<div ref={editFormRef}> <EditForm key={task.id} task={task} /> </div>: null}
                <Component.ButtonDelete onClick={() => handleDelete(task.id)}>🗑️</Component.ButtonDelete>
            </Component.Container>

        </Component.Container>

    );
}