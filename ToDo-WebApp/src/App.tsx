import { useCallback, useEffect, useState } from 'react';
import './App.css'
import * as Components from './App.styles';
import { Task } from './Model/Task';
import axios from 'axios';
import {} from './components/TaskComp';

const API_URL = "http://localhost:5287/"
const App = () => {
  const [list, setList] = useState<Task[]>();

  const fetchTaskList = useCallback(async()=>{
    try{

    
   const response = await axios.get(
    `${API_URL}TaskList`
    ) 
    setList(response.data);
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
        {list &&
          list.map(task=>(
            <div key={task.id}>
              <h1>{task.taskName}
              </h1>
              <p>{task.description}</p>
            </div>
          )

          )
        }
      </Components.Area>
    </Components.Container>
  )
}

export default App
