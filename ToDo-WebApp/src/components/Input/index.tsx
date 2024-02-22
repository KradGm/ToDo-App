import { useCallback, useState } from 'react';
import api from '../../services/Api';
import * as Component from './styles';
import { Task } from '../../Model/Task';
import Search from 'antd/es/input/Search';

interface InputCompProps {
    setGlobalList: (list: Task[]) => void;
  }

export const InputComp:React.FC<InputCompProps> = ({ setGlobalList }) => {
    const [list, setList] = useState<Task[]>([]);

    const fetchByNameList = useCallback(async(name:string)=>{
        try{
        const response =  await api
          .get(`api/task-list/${name}`);

          setList(response.data);
          setGlobalList(response.data);
          console.log(list);
      }catch(error){
        console.error(error);
      }
      }, [list]);
      

    return (
        <Component.Container>
            <Search placeholder="Insira o nome da tarefa" onSearch={fetchByNameList} enterButton />
        </Component.Container>
    );
}