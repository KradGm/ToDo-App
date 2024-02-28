import * as Component from "./styles";
import { useCallback, useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { Button, Form, Input, Select } from "antd";
import { SaveTwoTone } from "@ant-design/icons";
import { Task } from "../../model/Task";

type Props = {
  task?: Task;
  onRequestPost: (data: Task) => void;
  onRequestPatch: (data: Task) => void;
};
export const TaskForm: React.FC<Props> = ({
  task,
  onRequestPost,
  onRequestPatch,
}) => {
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(Boolean);

  const onFinish = useCallback(async (values: any) => {
    if (task != null) {
      onRequestPatch({
        id: task.id,
        status: values.status,
        taskName: values.taskName,
        description: values.description});
      console.log(`Status atualizado para: ${values.status}`);
    } else {
      onRequestPost(form.getFieldsValue());
      form.resetFields();
    }
  }, []);

  useEffect(() => {
    if (!task) {
      console.log("task não existe");
      setIsEdit(false);
      console.log(isEdit);
    } else {
      setIsEdit(true);
      console.log("task existe");
      form.setFieldsValue(task);
    }
  }, []);

  return (
    <Component.Container>
      <Form form={form} onFinish={onFinish} layout="vertical" name="basic">
        
        {isEdit ?<Component.FormTitle>Editar Tarefa</Component.FormTitle> : <Component.FormTitle>Criar Tarefa</Component.FormTitle>}

        <Form.Item<Task> label="Nome da Tarefa:" name="taskName">
          <Input placeholder="Nome da tarefa" maxLength={20} required />
        </Form.Item>
        <Form.Item<Task> label="Select" name="status">
        <Select options={[{ value:0, label:<span>Concluido</span> },{ value:1, label: <span>Não Iniciado</span> },{ value:2, label: <span>Em Andamento</span> }]}/>
        </Form.Item>
        <Form.Item<Task> name="description" label="Descreva sua tarefa">
          <TextArea placeholder="Descreva sua tarefa" rows={4} maxLength={60} />
        </Form.Item>
        <Form.Item
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {isEdit ? (
            <Component.ButtonA htmlType="submit">
              <SaveTwoTone />
            </Component.ButtonA>
          ) : (
            <Button type="primary" htmlType="submit">
              Enviar
            </Button>
          )}
        </Form.Item>
      </Form>
    </Component.Container>
  );
};
