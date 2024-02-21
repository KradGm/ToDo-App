import { useCallback, useEffect, useState } from 'react';
import './App.css'
import * as Components from './App.styles';
import { Task } from './Model/Task';
import {TaskComp} from './components/Task';
import api from './services/Api';
import {AddTask} from './components/AddTask';


const App = () => {
  
  const [list, setList] = useState<Task[]>();

  const fetchTaskList = useCallback(async()=>{
    try{
    const response =  await api
      .get("TaskList");
     
    setList(response.data) 
  }catch(error){
    console.error(error);
  }
  }, [list]);

  useEffect(()=>{
    fetchTaskList()
  },[fetchTaskList])

  return (
    <Components.Container>
      <Components.Area>
        <Components.Header>
          Lista de Tarefas
        </Components.Header>
        <AddTask/>
        {list &&
          list.map(task=>(
            <TaskComp key={task.id} task={task}></TaskComp>
          )

          )
        }
      </Components.Area>
    </Components.Container>
  )
}

export default App
