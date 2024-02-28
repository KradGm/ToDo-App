import { useCallback, useEffect, useState } from 'react';
import './App.css'
import * as Components from './App.styles';
import { Task } from './model/Task';
import {TaskComp} from './components/Task';
import {AddTask} from './components/AddTask';
import { InputComp } from './components/Input';
import { AlertComp } from './components/Alert';
import { onGetAllTasks, onPatch, onPost } from './services/Api';


type Props={
  error:boolean;
}

const App = ({error}:Props) => {
  
  const [list, setList] = useState<Task[]>([]);
  
  const fetchTaskList = useCallback(async()=>{
    try{
    setList(await onGetAllTasks());
    }catch(error){
    console.error(error);
    }
  }, []);

  const onRequestPost = useCallback(async (data: Task) => {
    try {
      const newTask = await onPost(data);
      setList(prevList => [...prevList, newTask]);
    } catch (error) {
      console.error(error);
    }
  }, []);
  const onRequestPatch = useCallback(async (data:Task)=>{
   try{
     await onPatch(data);
     fetchTaskList();
   }catch(error){
    console.error(error)
   }
   
  }, []);

  useEffect(()=>{
    fetchTaskList();
  },[setList,fetchTaskList])

  return (
    <Components.Container>
      <Components.Area>
        {error &&<AlertComp />}
        <Components.Header>
          LISTA DE TAREFAS
        </Components.Header>
        <InputComp setGlobalList={setList} />
              <AddTask onRequestPatch={onRequestPatch} onRequestPost={onRequestPost}/>
        {list.map(task=>(
            <TaskComp onRequestPatch={onRequestPatch} onRequestPost={onRequestPost} key={task.id} task={task} error={error} />
          )
          )
        }
      </Components.Area>
    </Components.Container>
  )
}

export default App
