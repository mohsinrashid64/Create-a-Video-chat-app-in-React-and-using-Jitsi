import './App.css';
import React from 'react';
import {Route,Routes} from 'react-router-dom'
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';



function App() {
  return (

    <div>
      <Routes>
      <Route path='/' element={<Login/>}></Route>  
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/home' element={<Home/>}></Route>  
      </Routes>
      

    </div>
    
  );
}

export default App;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [todos, setTodos] = useState([]);
//   const [newTodoText, setNewTodoText] = useState('');

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   const fetchTodos = async () => {
//     try {
//       const response = await axios.get('/todos');
//       setTodos(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleInputChange = (e) => {
//     setNewTodoText(e.target.value);
//   };

//   const addTodo = async () => {
//     if (!newTodoText) return;

//     try {
//       await axios.post('/todos/add', { text: newTodoText });
//       setNewTodoText('');
//       fetchTodos();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <h1>Todo App</h1>
//       <input
//         type="text"
//         value={newTodoText}
//         onChange={handleInputChange}
//         placeholder="Enter a new todo..."
//       />
//       <button onClick={addTodo}>Add Todo</button>

//       <ul>
//         {todos.map((todo) => (
//           <li key={todo._id}>
//             {todo.text} - {todo.completed ? 'Completed' : 'Not Completed'}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default App;
