import { useEffect } from "react";
import { Task } from "../../model/Task";
import { TaskForm } from "../TaskForm";

//Styles
import { Button, Modal } from "antd";
import * as Component from "./styles";

type Props = {
  task: Task;
  onRequestPatch: (data: Task) => void;
  onRequestPost: (data: Task) => void;
  isModalOpen: boolean;
  setIsModalOpen: (boolean: boolean) => void;
  onStatusChange?: (status: number) => void;
};

export const EditForm: React.FC<Props> = ({
  task,
  onRequestPatch,
  onRequestPost,
  isModalOpen,
  setIsModalOpen,
  onStatusChange
}) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log(isModalOpen);
  }, []);

  return (
    <Component.Modal>
      <Component.EditForm>
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
            onStatusChange={onStatusChange}
          />
        </Modal>
      </Component.EditForm>
    </Component.Modal>
  );
};
