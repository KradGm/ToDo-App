import React, { useState } from "react";
import { TaskForm } from "../TaskForm";
import { Task } from "../../model/Task";

//Styles
import { PlusCircleFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
import * as Component from "./styles";

type Props = {
  onRequestPost: (data: Task) => void;
  onRequestPatch: (data: Task) => void;
  task?: Task;
};

export const AddTask: React.FC<Props> = ({
  onRequestPost,
  onRequestPatch,
  task,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setShowForm(!showForm);
    showModal();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Component.Container>
      <Component.Button onClick={handleClick}>
        <PlusCircleFilled />
      </Component.Button>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancelar
          </Button>,
        ]}
      >
        <TaskForm
          handleOk={handleOk}
          task={task}
          onRequestPatch={onRequestPatch}
          onRequestPost={onRequestPost}
        />
      </Modal>
    </Component.Container>
  );
};
