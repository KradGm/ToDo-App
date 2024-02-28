import { useEffect } from "react";
import { Task } from "../../model/Task";
import * as Component from "./styles";
import { CloseOutlined } from "@ant-design/icons";
import { TaskForm } from "../TaskForm";
import { Modal } from "antd";

type Props = {
  task: Task;
  setShow: (boolean: boolean) => void;
  showError:boolean;
  onRequestPatch: (data:Task)=>void;
  onRequestPost:(data:Task)=>void;
  isModalOpen:boolean;
  setIsModalOpen:(boolean:boolean)=>void;
};

export const EditForm:React.FC<Props> = ({ task, setShow, onRequestPatch, onRequestPost,isModalOpen,setIsModalOpen }) => {
  
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
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}><TaskForm task={task} onRequestPatch={onRequestPatch} onRequestPost={onRequestPost} /></Modal>
      </Component.EditForm>
    </Component.Modal>
  );
};
