import { Task } from '../../Model/Task';
import api from '../../services/Api';
import * as Component from './styles';
import { CloseOutlined, SaveTwoTone } from '@ant-design/icons';
import {  Form, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';

type Props = {
    task: Task;
}
export const EditForm = ({ task }: Props) => {
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        const taskName = form.getFieldValue("taskName");
        const description = form.getFieldValue("description");
        const status = form.getFieldValue("status");

        const numberStatus = parseInt(status);

        api.put(`api/tasks/${task.id}`, { id: task.id, taskName: taskName, status: numberStatus, description: description });
        console.log({ id: task.id, taskName: taskName, status: numberStatus, description: description });
    }


    return (
        <Component.Modal>
            <Component.EditForm onSubmit={handleSubmit}>
                <Component.CloseButton ><CloseOutlined /></Component.CloseButton>
                <Form form={form}
                    onFinish={handleSubmit}
                    layout="vertical"
                    name='basic'>
                    <Form.Item<Task>
                        label="Nome da Tarefa:"
                        name="taskName"
                        initialValue={task.taskName}>
                        <Input required maxLength={20} />
                    </Form.Item>
                    <Form.Item<Task> label="Select"
                        name="status"
                        initialValue={task.status.toString()}>
                        <Select>
                            <Select.Option value="0">Concluido</Select.Option>
                            <Select.Option value="1">Não iniciado</Select.Option>
                            <Select.Option value="2">Em andamento</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item<Task> name="description" label="Descreva sua tarefa" initialValue={task.description}>
                        <TextArea rows={4} maxLength={60} />
                    </Form.Item>
                </Form>
                <Component.SaveButton><SaveTwoTone /></Component.SaveButton>
            </Component.EditForm>
        </Component.Modal>
    );
}