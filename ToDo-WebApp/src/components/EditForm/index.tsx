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
  setIsModalOpen: (isOpen: boolean) => void;
};

export const EditForm: React.FC<Props> = ({
  task,
  onRequestPatch,
  onRequestPost,
  isModalOpen,
  setIsModalOpen,
}) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


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
          />
        </Modal>
      </Component.EditForm>
    </Component.Modal>
  );
};
