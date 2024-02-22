import * as Component from './styles';
import { Task } from '../../Model/Task';
import api from '../../services/Api';
import {  useCallback, useEffect, useState } from 'react';
import { EditForm } from '../EditForm';
import React from 'react';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Select } from 'antd';


type Props = {
    task: Task;
}

export const TaskComp = ({ task }: Props) => {
    const [status, setStatus] = useState(task.status.toString());
    const [showEditForm, setShowEditForm] = useState(false);
    const editFormRef = React.useRef<HTMLDivElement>(null);

    const handleChange = useCallback((value: number) => {
        setStatus(value.toString());
        
        try {
            api.put(`api/tasks/${task.id}`, { id: task.id,taskName:task.taskName, status: value })
            console.log(`Status atualizado para: ${status}`);
        }
        catch (error) {console.error(error);}
        
        console.log({id:task.id, status:value});
    },[]);

    const handleDelete = useCallback(async (taskid: number) => {
        const confirmAct = window.confirm("Você tem certeza disso?");

        if (confirmAct) {
            try {
                await api.delete(`/api/Task/${taskid}`);
            } catch (error) {
                console.error(error);
            }
        }
    }, []);

    const handleClick = useCallback(() => {
        console.log("oi")
        setShowEditForm(true);
    }, []);

    const handleClickOutside = useCallback((event: MouseEvent) => {
            if (editFormRef.current && !editFormRef.current.contains(event.target as Node)) {
            setShowEditForm(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);


    return (
        <Component.Container>
            <Component.Container>
                <Select  style={{ width: 120 }} defaultValue={task.status}  onChange={handleChange}>
                    <Select.Option value={0}>Concluido</Select.Option>
                    <Select.Option value={1}>Não iniciado</Select.Option>
                    <Select.Option value={2}>Em andamento</Select.Option>
                </Select>
                <label>{task.taskName}</label>
                <p>{task.description}</p>
            </Component.Container>
            <Component.Container>
                <Component.ButtonEdit onClick={handleClick}><EditFilled /></Component.ButtonEdit>
                {showEditForm ?<div ref={editFormRef}> <EditForm key={task.id} task={task} /> </div>: null}
                <Component.ButtonDelete onClick={() => handleDelete(task.id)}><DeleteFilled /></Component.ButtonDelete>
            </Component.Container>

        </Component.Container>

    );
}