import * as Component from "./styles";
import { useCallback, useEffect } from "react";
import TextArea from "antd/es/input/TextArea";
import { Button, Form, Input, Select } from "antd";
import { Task } from "../../model/Task";
import { onPost } from "../../services/Api";

type Props = {
  handlerUpdate: () => void;
  task?: Task;
};
export const TaskForm: React.FC<Props> = ({ handlerUpdate, task }) => {
  const [form] = Form.useForm();

  const onRequestPost = useCallback(async (data: Task) => {
    try {
      onPost(data);
    } catch (error) {
      console.error(error);
      window.alert("Já existe uma tarefa com esse Nome");
    }
    handlerUpdate();
  }, [handlerUpdate]);

  const onFinish = useCallback(async (data:Task)=>{
    console.log(data);
    onRequestPost(data);
    form.resetFields();
  }, [])

  useEffect(() => {
    if (task) {
      form.setFieldsValue(task);
    }
  }, []);

  return (
    <Component.Container>
      <Form form={form} onFinish={onFinish} layout="vertical" name="basic">
        <Form.Item<Task> label="Nome da Tarefa:" name="taskName">
          <Input placeholder="Nome da tarefa" maxLength={20} required />
        </Form.Item>
        <Form.Item<Task> label="Select" name="status">
          <Select>
            <Select.Option value={0}>Concluido</Select.Option>
            <Select.Option value={1}>Não iniciado</Select.Option>
            <Select.Option value={2}>Em andamento</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item<Task> name="description" label="Descreva sua tarefa">
          <TextArea placeholder="Descreva sua tarefa" rows={4} maxLength={60} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Component.Container>
  );
};
