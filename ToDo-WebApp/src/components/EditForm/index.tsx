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
        const taskName = formData.get("taskName");
        const description = formData.get("description");
        const status = formData.get("status");

        if(status){
            status.toString();
         } else{
             return 'parseStatus nao existe'
         }
 
         const numberStatus = parseInt(status);
    
        api.put(`api/tasks/${task.id}`,{id:task.id, taskName:taskName, status:numberStatus, description:description});
        console.log({id:task.id, taskName:taskName, status:numberStatus, description:description});
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