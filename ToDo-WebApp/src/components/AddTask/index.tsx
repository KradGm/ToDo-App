import React, { useState } from "react";
import { TaskForm } from "../TaskForm";
import { Task } from "../../interfaces/Task";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    showModal();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Component.Container>
      <Component.Button onClick={handleClick}>
        <PlusCircleFilled />
      </Component.Button>
      <Modal
        open={isModalOpen}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
        footer={[
          <Button key="back" onClick={handleCloseModal}>
            Cancelar
          </Button>,
        ]}
      >
        <TaskForm
          handleOk={handleCloseModal}
          task={task}
          onRequestPatch={onRequestPatch}
          onRequestPost={onRequestPost}
        />
      </Modal>
    </Component.Container>
  );
};
