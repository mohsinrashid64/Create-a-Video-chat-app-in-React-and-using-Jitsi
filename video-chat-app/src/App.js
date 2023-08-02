// import React, { useState } from "react";
// import "./Styles/Connect.css";
// import Login from "./Components/Login";

// import Jitsi from "react-jitsi";
// import axios from 'axios';



// const App = () => {

//   const [callIsActive, setCallIsActive] = useState(false);
//   const [inputs, setInputs] = useState({
//     roomName: "",
//     participantsName: "",
//   });

//   function handleInputs(event) {
//     const { value, name } = event.target;
//     setInputs((prevInputs) => {
//       if (name === "roomName") {
//         return {
//           roomName: value,
//           participantsName: prevInputs.participantsName,
//         };
//       } else if (name === "participantsName") {
//         return {
//           roomName: prevInputs.roomName,
//           participantsName: value,
//         };
//       }
//     });
//   }

//   const handleAPI = async (api) => {
//     api.addEventListener("videoConferenceJoined", async () => {
//       let data = {num :  await api.getNumberOfParticipants()} 
//       await axios.post('/api/set-number-of-participants', data)
//     });
//     let check = true
//     api.addEventListener('videoConferenceLeft',  function ()  {
//       if ( check === true){
//         let data = {num :  api.getNumberOfParticipants() * -1} 
//         console.log("PARTICIPANT LEFT",data)
//         axios.post('/api/decrease-number-of-participants',data)
//         check =false
//       }
//     })  
//   };
//   async function joinMeeting() {
//     console.log("JOING MEETING FUNCTION")
//     let responseOfNumOfParticipants = await axios.get('/api/send-number-of-participants')
//     console.log("allowTwoParticipants FUNCTION:", responseOfNumOfParticipants.data.num)
//     let numberOfParticipants = responseOfNumOfParticipants.data.num
//     if (numberOfParticipants < 2){
//       setCallIsActive(true);
//     } else {
//       alert("YO MAN THERE ARE ALREADY TWO PARTICPANTS HERE SO GET THE HELL OUT OF HERE YOU MEGALOMANIACAL JESTER")
//     } 
//   }

//   return (

    

//     <div className="main-container">
//       <Login/>
//       <div className="row">
//         <div className="col">
//           {callIsActive ? (
//             <div className="jitsi-container">
//               <Jitsi
//                 roomName={inputs.roomName}
//                 displayName={inputs.participantsName}
//                 onAPILoad={handleAPI}
//                 containerStyle={{ width: '800px', height: '600px' }}
//                 config={{
//                   prejoinPageEnabled: false,
//                   disableDeepLinking: true,
//                   transcribingEnabled: true,
//                   startWithAudioMuted: true,
//                   startWithVideoMuted: true,
//                   p2p: true,
//                 }}
//                 interfaceConfig={{
//                   APP_NAME: "Video Chat App",
//                   TOOLBAR_BUTTONS: ["microphone", "camera", "chat", "hangup"],
//                   TOOLBAR_ALWAYS_VISIBLE: true,
//                 }}
//               />
//             </div>
//           ) : (
//             <div className="container">
//               <div className="inner-container">
//                 <p>Create / Join a Room</p>
//                 <input
//                   type="text"
//                   name="roomName"
//                   placeholder="Room name"
//                   onChange={handleInputs}
//                 />
//                 <input
//                   type="text"
//                   name="participantsName"
//                   placeholder="Your name"
//                   onChange={handleInputs}
//                 />
//                 <button onClick={joinMeeting}>CONNECT</button>
//               </div>
//             </div>
//           )}
//         </div>    
//       </div>
//     </div>
//   );
// };

// export default App;



////////////////// 

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/todos');
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setNewTodoText(e.target.value);
  };

  const addTodo = async () => {
    if (!newTodoText) return;

    try {
      await axios.post('/todos/add', { text: newTodoText });
      setNewTodoText('');
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        value={newTodoText}
        onChange={handleInputChange}
        placeholder="Enter a new todo..."
      />
      <button onClick={addTodo}>Add Todo</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text} - {todo.completed ? 'Completed' : 'Not Completed'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
