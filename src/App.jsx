import React, { useEffect } from 'react'
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import "./index.scss";
import Todos from './components/todos/Todos';

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: "1",
      label: "Lorem, ipsum dolor.",
      completed: false
    },
    {
      id: "2",
      label: "Lorem ipsum dolor sit.",
      completed: true
    },
    {
      id: "3",
      label: "Lorem ipsum dolor sit.",
      completed: false
    },
    {
      id: "4",
      label: "Lorem ipsum dolor sit.",
      completed: true
    }
  ]);

  const [completed, setCompleted] = useState(false);

  const [sort, setSort] = useState("All");

  const [count, setCount] = useState(0);

  const [search, setSearch] = useState("");

  const [filteredSearchTodos, setFilteredSearchTodos] = useState ([]);


  const countActiveTasks = () => {
    let filteredTodos = todos.filter(todo => !todo.completed);
    setCount(filteredTodos.length);
  }


  const sortTasks = () => {
    if(sort === "All") return todos;
    if(sort === "Active") return todos.filter(todo => todo.completed === false);
    if(sort === "Completed") return todos.filter(todo => todo.completed === true);
  } 


  const handleTodoAdd = (e) => {
    if (e.keyCode === 13) {
        let label = e.target.value;

        setTodos([...todos, { id: uuidv4(), label, completed: false }]);
        e.target.value = "";

        setSearch("");
    }
  }


  const handleChangeChecked = (todoId) => {
    setTodos(todos.map(todo => {
      if(todo.id === todoId){
        todo.completed = !todo.completed
      }
      return todo
    }))
  }


const handleTodoRemove = (todoId) => {
    let filteredTodos = todos.filter(todo => todo.id !== todoId);

    setTodos(filteredTodos)
}


const handleSaveLabel = (todoId, label) => {
  setTodos(todos.map(todo => {
    if(todo.id === todoId){
      todo.label = label;
    }
    return todo
  }))
}


const clearCompletedTasks = () => {
  let filteredTodos = todos.filter(todo => !todo.completed);
  setTodos(filteredTodos);
}

const handleChangeSearch = (e) => {
  setSearch(e.target.value);
}


const setTasksCompleted = () => {
  if(!completed){
    setTodos(prevTodos => 
      prevTodos.map(todo => ({
      ...todo,
      completed: true
    }))
    )
    setCompleted(true);
  }
  if(completed){
    setTodos(prevTodos => 
      prevTodos.map(todo => ({
        ...todo,
        completed: false
      })
      )
    )
    setCompleted(false);
  }
}


useEffect(() => {
  countActiveTasks();
}, [todos]);


useEffect(() => {
  setFilteredSearchTodos(todos.filter(todo => todo.label.toLocaleLowerCase().includes(search.toLocaleLowerCase())));
}, [search, todos])

let data = search.length > 0 ? filteredSearchTodos : todos; 

const filteredTodos = data.filter(todo => {
  if(sort === "Active") return !todo.completed;
  if(sort === "Completed") return todo.completed;
  return true;
})


  return (
    <div className='container'>
      <h2 className='title'>todos</h2>
      <div className="todos">
        <div className="todos-header">
          <button onClick={setTasksCompleted}>></button>
          <input type="text" placeholder='What needs to be done?' onKeyUp={handleTodoAdd} onChange={handleChangeSearch}/>
        </div>
        <div className="todos-content">
          {
            todos && filteredTodos.map(item => <Todos 
              key={item.id} 
              completed={item.completed} 
              label={item.label} 
              remove={() => handleTodoRemove(item.id)} 
              id={item.id} 
              onChecked={handleChangeChecked}
              changeLabel={handleSaveLabel} />)

          }
        </div>
      </div>
      <div className="footer">
        <p className="counter">{count} items left!</p>
        <div className='filters'>
          <button className={`btn ${sort === "All" ? "isActive" : ""}`} onClick={() => setSort("All")}>All</button>
          <button className={`btn ${sort === "Active" ? "isActive" : ""}`} onClick={() => setSort("Active")}>Active</button>
          <button className={`btn ${sort === "Completed" ? "isActive" : ""}`} onClick={() => setSort("Completed")}>Completed</button>
        </div>
        <button className='clear-btn' onClick={clearCompletedTasks}>Clear completed</button>
      </div>
    </div>
    // <div>
    //   <UserList />
    //   <PostList />
    // </div>
  )
}

export default App
