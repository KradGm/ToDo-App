import { useEffect } from "react";
import { Task } from "../../model/Task";
import * as Component from "./styles";
import { TaskForm } from "../TaskForm";
import { Button, Modal } from "antd";

type Props = {
  task: Task;
  onRequestPatch: (data:Task)=>void;
  onRequestPost:(data:Task)=>void;
  isModalOpen:boolean;
  setIsModalOpen:(boolean:boolean)=>void;
};

export const EditForm:React.FC<Props> = ({ task, onRequestPatch, onRequestPost,isModalOpen,setIsModalOpen }) => {
  
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  useEffect(()=>{
    console.log(isModalOpen);
  }, [])

  return (
    <Component.Modal>
      <Component.EditForm>
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[
          <Button key="back" onClick={handleCancel}>
            Cancelar
          </Button>]}><TaskForm  task={task} onRequestPatch={onRequestPatch} onRequestPost={onRequestPost} /></Modal>
      </Component.EditForm>
    </Component.Modal>
  );
};
