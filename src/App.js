/*
-import useState from react
-cll useState inside out function with an initial value
-get back two things in our array
-use array destructuring to unpack those two things
-use them to make our UI interactive

const[Something, setSomething] = useState(initialValue)

*/


import React, {useState} from 'react'; 




function App(){


  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task=>task.completed).length;
  const remainingTasks = totalTasks - completedTasks;

  const CompletedPercentage = totalTasks >0?
    Math.round((completedTasks/totalTasks)*100):0;
  console.log('Starts - Total: ',totalTasks, 'Completed: ',completedTasks, 'Remaining: ',remainingTasks);


  console.log('Component rendered!');
  console.log('Current task:',tasks);
  console.log('Current input:',newTask);

  const handleAddTask = () => {

    if(newTask.trim()){

      const task = {
        id: Date.now(),
        text:newTask,
        completed:false
      };
      console.log('Creating task object: ',task);
      setTasks([...tasks,task]);
      setNewTask('');
    }
    
  }

  const toggleTask = (id) => {
    console.log('Toggling task with ID: ',id);
    setTasks(tasks.map(task=> {
      //if this is the task we want to toggle
      if(task.id === id){
        //create a new task object with completed flipped
        return {...task, completed:!task.completed};
      }
      //otherwise return the task unchanges
      return task
    }));
  };

  const deleteTask =(id) => { 
    console.log('deleteing task with id: ',id);
    setTasks(tasks.filter(task=> task.id!==id));
  }

  console.log('component rendere! Current input: ',newTask);
  return(
    <div>
      <h1 style={{color:'#de9c59ff',textAlign:'center'}}> My Task List</h1>
      <div style={{
        backgroundColor:'#cccac8ff',
        padding:'10px 50px',
        margin:'10px 0',
        borderRadius:'5px'
      }}>
        <h3>Task Statistics</h3>
        <p>Total Tasks: {totalTasks}</p>
        <p>Completed Tasks: {completedTasks}</p>
        <p>Remaining Tasks: {remainingTasks}</p>

        <div style={{
          width:'100%',
          height:'20px',
          backgroundColor:'#ddd',
          borderRadius:'10px',
          overflow:'hidden'
        }}>
          <div style={{
            width:`${CompletedPercentage}%`,
            height:'100%',
            backgroundColor:'#4caf50',
            transition:'width 0.3s ease'
          }}>

          </div>
        </div>
        <p>Progress: {CompletedPercentage}%</p>

      </div>
      <input
        value={newTask}
        onChange={(e)=> setNewTask(e.target.value)}
        placeholder="Enter a task...."/>
      <button onClick={handleAddTask} >Add Task</button>


      <ul>
        {tasks.map(task=> (
          <li key={task.id}>
            <input 
              type="checkbox"
              checked={task.completed}
              onChange={()=> toggleTask(task.id)}
            />
            <span>{task.text}</span>
            <button onClick={()=>deleteTask(task.id)}>Delete</button>
            </li>
        ))}
      </ul>
    </div>
  )
} 


export default App;