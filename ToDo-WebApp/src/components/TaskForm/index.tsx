import api from '../../services/Api';
import * as Component from './styles';
import { useCallback } from 'react';
import TextArea from 'antd/es/input/TextArea';
import {
    Button,
    Form, Input, Select


} from 'antd';
import { Task } from '../../Model/Task';

type Props = {
    handlerUpdate: ()=> void
}
export const TaskForm = ({handlerUpdate}:Props) => {
    const [form] = Form.useForm();

    const onPost = useCallback( async () => {
        const endPoint = 'api/tasks';

        const taskName = form.getFieldValue('taskName');
        const status = form.getFieldValue('status');
        const description = form.getFieldValue('description');
        const statusNumber = parseInt(status);
        try {   
            await api.post(endPoint, {taskName:taskName, status:statusNumber, description:description });
        } catch (error) {
            console.error(error);
            window.alert('Já existe uma tarefa com esse Nome')
        }
        handlerUpdate();
    }, [form, handlerUpdate]);

    const resetForm = useCallback(()=>{
        form.setFieldValue('taskName', '');
        form.setFieldValue('status', '');
        form.setFieldValue('description', '');

    }, []);

    return (
        <Component.Container>
            <Form 
                form={form}
                onFinish={()=>{onPost(); resetForm()}}
                layout="vertical"
                name='basic'>
                <Form.Item<Task> 
                label="Nome da Tarefa:"
                name="taskName" >
                    <Input placeholder='Nome da tarefa' maxLength={20} required />
                </Form.Item>
                <Form.Item<Task> label="Select"
                name="status">
                    <Select className='test'>    
                        <Select.Option value="0">Concluido</Select.Option>
                        <Select.Option value="1">Não iniciado</Select.Option>
                        <Select.Option value="2">Em andamento</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item<Task> name="description" label="Descreva sua tarefa">
                    <TextArea placeholder="Descreva sua tarefa" rows={4} maxLength={60} />
                </Form.Item>
                <Form.Item>
                <Button type="primary" htmlType='submit'>Submit</Button>
                </Form.Item>
            </Form>
           
             
        </Component.Container>
    );
}