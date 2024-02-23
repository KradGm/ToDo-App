import { useCallback, useEffect, useState } from 'react';
import './App.css'
import * as Components from './App.styles';
import { Task } from './Model/Task';
import {TaskComp} from './components/Task';
import api from './services/Api';
import {AddTask} from './components/AddTask';
import { InputComp } from './components/Input';


const App = () => {
  
  const [list, setList] = useState<Task[]>([]);
  
  const fetchTaskList = useCallback(async()=>{
    try{
    const response =  await api
      .get("api/task-list");
     
    setList(response.data) 
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
        <Components.Header>
          LISTA DE TAREFAS
        </Components.Header>
        <InputComp setGlobalList={setList} />
              <AddTask handlerUpdate={fetchTaskList}/>
        {list.map(task=>(
            <TaskComp handlerUpdate={fetchTaskList} key={task.id} task={task} />
          )
          )
        }
      </Components.Area>
    </Components.Container>
  )
}

export default App
