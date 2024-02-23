import { MouseEventHandler, useCallback, useEffect, useState } from 'react';
import './App.css'
import * as Components from './App.styles';
import { Task } from './Model/Task';
import {TaskComp} from './components/Task';
import api from './services/Api';
import {AddTask} from './components/AddTask';
import { InputComp } from './components/Input';


const App = () => {
  
  const [list, setList] = useState<Task[]>([]);
  const AnotherCOmp = (props: { doIt: MouseEventHandler<HTMLButtonElement> | undefined; }) =>{
    return <button onClick={props.doIt}>Hello</button>
  }
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
          Lista de Tarefas
        </Components.Header>
        <InputComp setGlobalList={setList} />
              <AddTask/>
        {list.map(task=>(
            <TaskComp key={task.id} task={task}/>
          )
          )
        }
      </Components.Area>
      <AnotherCOmp doIt={fetchTaskList}/>
    </Components.Container>
  )
}

export default App
