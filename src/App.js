import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { NewToDoForm } from './NewToDoForm';
import { ToDoList } from './ToDoList';

function App() {
  const [todos, setTodos] = useState(()=>{
    const localvalue = localStorage.getItem("ITEMS");
    if(localvalue===null) return [];
    return JSON.parse(localvalue);
  });

  useEffect(()=>{
    localStorage.setItem("ITEMS",JSON.stringify(todos))
  },[todos])
 
  function addToDo(title){
     setTodos(currentTodos => {
            return [
                ...currentTodos,
                { id: crypto.randomUUID(), title, completed: false },
            ]
        })
  }
  function toggleTodo(id,completed){
    setTodos(currentTodos=>{
      return currentTodos.map(todo=>{
        if (todo.id===id){
          return {...todo, completed}
        }
        return todo
      })
    })
  }
  function deleteTodo(id){
    setTodos(currentTodos=>{
      return currentTodos.filter(todo=>todo.id!==id)
    })
  }
  return (

    <>
      <NewToDoForm addToDo={addToDo}/>
      <h1 className='header'>ToDo List</h1>
      <ToDoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
    </>
  );
}

export default App;
