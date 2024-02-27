import { useCallback, useEffect, useState } from "react";
import { Task } from "../../model/Task";
import api from "../../services/Api";
import * as Component from "./styles";
import { CloseOutlined, SaveTwoTone } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

type Props = {
  task: Task;
  setShow: (boolean: boolean) => void;
  handlerUpdate: () => void;
  showError:boolean;
};

export const EditForm = ({ task, setShow, handlerUpdate }: Props) => {
  const [form] = Form.useForm();
  const [showError, setShowError] = useState(Boolean);

  const handleSubmit = useCallback(async () => {
    const taskName = form.getFieldValue("taskName");
    const description = form.getFieldValue("description");
    const status = form.getFieldValue("status");
    const numberStatus = parseInt(status);

    try {
      await api.put(`api/tasks/${task.id}`, {
        id: task.id,
        taskName: taskName,
        status: numberStatus,
        description: description,
      });
    } catch (error: any) {
      setShowError(true);
      console.log(showError);
    };
    handlerUpdate();
  }, []);

  useEffect(()=>{
  }, [])

  return (
    <Component.Modal>
      <Component.EditForm>
        <Component.CloseButton onClick={() => setShow(false)}>
          <CloseOutlined />
        </Component.CloseButton>
        <Form
          form={form}
          onFinish={() => {
            console.log(showError);
            handleSubmit();
            setShow(false);
          }}
          layout="vertical"
          name="basic"
        >
          <Form.Item<Task>
            label="Nome da Tarefa:"
            name="taskName"
            initialValue={task.taskName}
          >
            <Input required maxLength={20} />
          </Form.Item>
          <Form.Item<Task>
            label="Select"
            name="status"
            initialValue={task.status.toString()}
          >
            <Select>
              <Select.Option value="0">Concluido</Select.Option>
              <Select.Option value="1">Não iniciado</Select.Option>
              <Select.Option value="2">Em andamento</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item<Task>
            name="description"
            label="Descreva sua tarefa"
            initialValue={task.description}
          >
            <TextArea rows={4} maxLength={60} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button htmlType="submit">
              <Component.SaveButton>
                <SaveTwoTone />
              </Component.SaveButton>
            </Button>
          </Form.Item>
        </Form>
      </Component.EditForm>
    </Component.Modal>
  );
};
