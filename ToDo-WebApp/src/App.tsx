import { useCallback, useEffect, useState } from 'react';
import './App.css'
import * as Components from './App.styles';
import { Task } from './model/Task';
import {TaskComp} from './components/Task';
import {AddTask} from './components/AddTask';
import { InputComp } from './components/Input';
import { AlertComp } from './components/Alert';
import { onGetAllTasks } from './services/Api';


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

  useEffect(()=>{
    fetchTaskList()
  },[fetchTaskList])

  return (
    <Components.Container>
      <Components.Area>
        {error &&<AlertComp />}
        <Components.Header>
          LISTA DE TAREFAS
        </Components.Header>
        <InputComp setGlobalList={setList} />
              <AddTask handlerUpdate={fetchTaskList}/>
        {list.map(task=>(
            <TaskComp  handlerUpdate={fetchTaskList} key={task.id} task={task} error={error} />
          )
          )
        }
      </Components.Area>
    </Components.Container>
  )
}

export default App
