import { FormEvent } from 'react';
import { Task } from '../../Model/Task';
import api from '../../services/Api';
import * as Component from './styles';
import { CloseOutlined, SaveTwoTone } from '@ant-design/icons';

type Props = {
    task: Task;
}
export const EditForm = ({ task }: Props) =>{
    const handleSubmit = async(event: FormEvent<HTMLFormElement>) =>  {
        const formData = new FormData(event.currentTarget)
        const newTaskName = formData.get("taskName");
        const newDescription = formData.get("description");
        const newStatus = formData.get("status");

        if(newStatus){
            var parseStatus = newStatus.toString();
        } else{
            return 'parseStatus nao existe'
        }

        const numberStatus = parseInt(parseStatus);
    
        api.put(`api/Task/${task.id}`, {id:task.id, taskName:newTaskName, status:numberStatus, description:newDescription} );
    }
    
    
    return(
            <Component.Modal>
            <Component.EditForm onSubmit={handleSubmit}>
            <Component.CloseButton><CloseOutlined /></Component.CloseButton>
            <label>Nome da Tarefa:</label>
            <input name="taskName" type="text" defaultValue={task.taskName}/>
            <label>
                    Status da Tarefa:
                    <br />
                    <select name="status" defaultValue={task.status}>
                        <option value="0">Concluido</option>
                        <option value="1">Não iniciado</option>
                        <option value="2">Em andamento</option>
                    </select>
                </label>
            <label>Descrição da Tarefa</label>
            <textarea  name="description" defaultValue={task.description}/>
            <Component.SaveButton><SaveTwoTone /></Component.SaveButton>
            </Component.EditForm>
            </Component.Modal>
    );
}