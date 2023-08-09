import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import Jitsi from "react-jitsi";
import { useLocation } from 'react-router';
import React, { useState, useEffect } from 'react';

import Form2 from "./SubComponents/Form2.0"
import List from "./SubComponents/List"

function App () {

  const location = useLocation();
  const _username = location.state?._username || '';
  const _email = location.state?._email || '';
  const [showForm, setShowForm] = useState(false);
  const [meetingName, setMeetingName] = useState('');
  const [userName, setUserName] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [participant, setParticipant] = useState('');
  const [participants, setParticipants] = useState([]);

  const [meetings, setMeetings] = useState([]);
  const [editedMeetingIndex, setEditedMeetingIndex] = useState(null);
  const [callIsActive, setCallIsActive] = useState(false);

  const [selectedName, setSelectedName] = useState('');
  const [responseData,setResponseData] = useState('');


  const [selectedRoomName, setSelectedRoomName] = useState('');



  const handleAPI = async (api) => {
    api.addEventListener("videoConferenceJoined", async () => {
      // let data = {num :  await api.getNumberOfParticipants()} 
      // await axios.post('/api/set-number-of-participants', data)
      console.log("ROOMS INFO",api.getRoomsInfo())
    });
    let check = true
    api.addEventListener('videoConferenceLeft',  function ()  {
      if ( check === true){
        console.log("ROOMS INFO",api.getRoomsInfo())

        let data = {num :  api.getNumberOfParticipants() * -1} 
        console.log("PARTICIPANT LEFT",data)
        // axios.post('/api/decrease-number-of-participants',data)
        check =false
        setCallIsActive(false);

      }
    })  
  };


  const [names, setNames] = useState([]);

  // Function to fetch names from the backend
  const fetchNames = () => {
    axios
      .get('http://172.16.2.117:5000/api/names')
      .then((response) => {
        setNames(response.data); // Update the names state with the fetched data
      })
      .catch((error) => {
        console.error('Error fetching names:', error);
      });
  };

  useEffect(() => {
    fetchNames();
  }, []);



  // Fetch names from the server
  const [meetingData, setMeetingData] = useState([]);

  const fetchMeetingData = () => {
    axios
      .get('http://172.16.2.117:5000/api/meetingData', {
        params: {
          email: _email,
        },
      })
      .then((response) => {
        setMeetingData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching meeting data:', error);
      });
  };

  useEffect(() => {
    fetchMeetingData();
  }, []); // Empty dependency array will trigger the fetchMeetingData only once on initial load

  // useEffect(() => {
  //   // This will log the updated meetingData whenever it changes
  //   console.log("Meeting Data", meetingData);
  // }, [meetingData]); // Add meetingData to the dependency array

  const toggleForm = () => {
    setShowForm(!showForm);
    setEditedMeetingIndex(null); // Reset the edited meeting index when toggling the form
  };

  const handleMeetingNameChange = (event) => {
    setMeetingName(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleMeetingDateChange = (event) => {
    setMeetingDate(event.target.value);
  };

  const handleMeetingTimeChange = (event) => {
    setMeetingTime(event.target.value);
  };

  const handleParticipantChange = (event) => {
    setParticipant(event.target.value);
  };

  const handleAddParticipant = async () => {
    if (participant.trim() === '') {
      alert('Please enter a valid participant name.');
      return;
    }

    setParticipants([...participants, participant]);
    setParticipant('');
  };

  const handleAddMeeting = () => {
    if (!meetingName || !userName || !meetingDate || !meetingTime || participants.length === 0) {
      alert('Please fill in all the details and add at least one participant before adding a meeting.');
      return;
    }

    const newMeeting = {
      email : _email,
      meetingName,
      userName,
      meetingDate: meetingDate + ' ' + meetingTime, // Combine the date and time values
      participants,
    };

    if (editedMeetingIndex !== null) {
      // If we are editing a meeting, update the existing meeting
      const updatedMeetings = [...meetings];
      updatedMeetings[editedMeetingIndex] = newMeeting;
      setMeetings(updatedMeetings);
    } else {
      // If it's a new meeting, add it to the list
      setMeetings([...meetings, newMeeting]);
    }

    axios
    .post('http://172.16.2.117:5000/api/addMeeting', newMeeting)
    .then((response) => {
      console.log('Server response:', response.data);
      // Optionally, you can set the server response in the state if needed:
      // setServerResponse(response.data);
    })
    .catch((error) => {
      console.error('Error sending meeting data to the server:', error);
      // Handle any error behavior here
    });

    setMeetingName('');
    setUserName('');
    setMeetingDate('');
    setMeetingTime(''); // Reset the time input field
    setParticipants([]);
    setEditedMeetingIndex(null); // Reset the edited meeting index after adding/editing a meeting
  };

  const handleJoinMeeting = (meetingName) => {
    console.log(`You have joined the meeting: ${meetingName}`);
    setCallIsActive(!callIsActive);
    setSelectedRoomName(meetingName); // Set the selected room name for Jitsi
  };

  const handleEditMeeting = (index) => {
    const meetingToEdit = meetings[index];
    setMeetingName(meetingToEdit.meetingName);
    setUserName(meetingToEdit.userName);
    setMeetingDate(meetingToEdit.meetingDate);
    setParticipants(meetingToEdit.participants);
    setEditedMeetingIndex(index);
    setShowForm(true);
  };

  const handleSelectChange = (event) => {
    setSelectedName(event.target.value);
  };

  const handleLogSelectedName = () => {
    console.log('Selected Name:', selectedName);
  };
  return (
    <div className="container mt-5">
      {showForm && !callIsActive ? (
        <div className="mb-4">
          <button
            className="btn btn-primary mb-3"
            onClick={() => setShowForm(false)}
          >
            <span className="arrow-back">&lt;</span> Back to List
          </button>
          <Form2
            names={names}
            handleUserNameChange={handleUserNameChange}
            handleMeetingNameChange={handleMeetingNameChange}
            handleMeetingDateChange={handleMeetingDateChange}
            handleMeetingTimeChange={handleMeetingTimeChange}
            handleParticipantChange={handleParticipantChange}
            handleAddParticipant={handleAddParticipant}
            handleAddMeeting={handleAddMeeting}
          />
        </div>
      ) : !callIsActive ? (
        <div>
          <h3 className="text-center mb-4">Video Chat App</h3>

          <List
            meetingData={meetingData}
            handleJoinMeeting={handleJoinMeeting}
            handleEditMeeting={handleEditMeeting}
            setCallIsActive={setCallIsActive}
          />

          <div className="d-flex justify-content-center align-items-center mt-4">
            <button
              className="btn btn-primary btn-lg rounded-circle"
              onClick={() => setShowForm(true)}
            >
              <span className="plus">+</span>
            </button>
            <p className="ms-2 mb-0">Add Meeting</p>
          </div>
        </div>
      ) : null}

      {callIsActive ? (
        <div className="mt-4">
          <Jitsi
            roomName={selectedRoomName}
            displayName={userName}
            onAPILoad={handleAPI}
            containerStyle={{ width: '100%', height: '500px' }}
            config={{
              prejoinPageEnabled: false,
              disableDeepLinking: true,
              transcribingEnabled: true,
              startWithAudioMuted: true,
              startWithVideoMuted: true,
              p2p: true,
            }}
            interfaceConfig={{
              TOOLBAR_BUTTONS: ["microphone", "camera", "chat", "hangup"],
              TOOLBAR_ALWAYS_VISIBLE: true,
            }}
          />
        </div>
      ) : null}
    </div>
  );
}



export default App;

// // <div className="App">
// //   {   condition === 'A' ? <ComponentA /> 
// //     : condition === 'B' ? <ComponentB />
// //     : condition === 'C' ? <ComponentC />
// //     : <DefaultComponent />
// //   }
// // </div>

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Jitsi from "react-jitsi";
// import List from './List.js';
// import Form2 from './Form2.0';

// function App(props) {
//   const [showForm, setShowForm] = useState(false);
//   const [meetingName, setMeetingName] = useState('');
//   const [userName, setUserName] = useState('');
//   const [meetingDate, setMeetingDate] = useState('');
//   const [meetingTime, setMeetingTime] = useState('');
//   const [participant, setParticipant] = useState('');
//   const [participants, setParticipants] = useState([]);

//   const [meetings, setMeetings] = useState([]);
//   const [editedMeetingIndex, setEditedMeetingIndex] = useState(null);
//   const [callIsActive, setCallIsActive] = useState(false);

//   const [selectedName, setSelectedName] = useState('');
//   const [responseData,setResponseData] = useState('');


//   const [selectedRoomName, setSelectedRoomName] = useState('');



//   const handleAPI = async (api) => {
//     api.addEventListener("videoConferenceJoined", async () => {
//       // let data = {num :  await api.getNumberOfParticipants()} 
//       // await axios.post('/api/set-number-of-participants', data)
//       console.log("ROOMS INFO",api.getRoomsInfo())
//     });
//     let check = true
//     api.addEventListener('videoConferenceLeft',  function ()  {
//       if ( check === true){
//         console.log("ROOMS INFO",api.getRoomsInfo())

//         let data = {num :  api.getNumberOfParticipants() * -1} 
//         console.log("PARTICIPANT LEFT",data)
//         // axios.post('/api/decrease-number-of-participants',data)
//         check =false
//         setCallIsActive(false);

//       }
//     })  
//   };


//   const [names, setNames] = useState([]);

//   // Function to fetch names from the backend
//   const fetchNames = () => {
//     axios
//       .get('http://172.16.2.117:5000/api/names')
//       .then((response) => {
//         setNames(response.data); // Update the names state with the fetched data
//       })
//       .catch((error) => {
//         console.error('Error fetching names:', error);
//       });
//   };

//   useEffect(() => {
//     fetchNames();
//   }, []);



//   // Fetch names from the server
//   const [meetingData, setMeetingData] = useState([]);

//   const fetchMeetingData = () => {
//     axios
//       .get('http://172.16.2.117:5000/api/meetingData', {
//         params: {
//           email: props.email,
//         },
//       })
//       .then((response) => {
//         setMeetingData(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching meeting data:', error);
//       });
//   };

//   useEffect(() => {
//     fetchMeetingData();
//   }, []); // Empty dependency array will trigger the fetchMeetingData only once on initial load

//   useEffect(() => {
//     // This will log the updated meetingData whenever it changes
//     console.log("Meeting Data", meetingData);
//   }, [meetingData]); // Add meetingData to the dependency array

//   const toggleForm = () => {
//     setShowForm(!showForm);
//     setEditedMeetingIndex(null); // Reset the edited meeting index when toggling the form
//   };

//   const handleMeetingNameChange = (event) => {
//     setMeetingName(event.target.value);
//   };

//   const handleUserNameChange = (event) => {
//     setUserName(event.target.value);
//   };

//   const handleMeetingDateChange = (event) => {
//     setMeetingDate(event.target.value);
//   };

//   const handleMeetingTimeChange = (event) => {
//     setMeetingTime(event.target.value);
//   };

//   const handleParticipantChange = (event) => {
//     setParticipant(event.target.value);
//   };

//   const handleAddParticipant = async () => {
//     if (participant.trim() === '') {
//       alert('Please enter a valid participant name.');
//       return;
//     }

//     try {
//       // Send the participant name and user ID to the server
//     //   const response = await axios.post('http://localhost:5000/updateParticipantName', {
//     //     participantNames: participant,
//     //     name: 'Mohsin', // Replace this with the user ID obtained during login
//     //   });

//     //   console.log('Participant name added successfully:', response.data);
//       // Handle any success behavior here
//     } catch (error) {
//       console.error('Error occurred while adding participant name:', error);
//       // Handle any error behavior here
//     }
//     setParticipants([...participants, participant]);
//     setParticipant('');
//   };

//   const handleAddMeeting = () => {
//     if (!meetingName || !userName || !meetingDate || !meetingTime || participants.length === 0) {
//       alert('Please fill in all the details and add at least one participant before adding a meeting.');
//       return;
//     }

//     const newMeeting = {
//       email : props.email,
//       meetingName,
//       userName,
//       meetingDate: meetingDate + ' ' + meetingTime, // Combine the date and time values
//       participants,
//     };

//     if (editedMeetingIndex !== null) {
//       // If we are editing a meeting, update the existing meeting
//       const updatedMeetings = [...meetings];
//       updatedMeetings[editedMeetingIndex] = newMeeting;
//       setMeetings(updatedMeetings);
//     } else {
//       // If it's a new meeting, add it to the list
//       setMeetings([...meetings, newMeeting]);
//     }

//     axios
//     .post('http://172.16.2.117:5000/api/addMeeting', newMeeting)
//     .then((response) => {
//       console.log('Server response:', response.data);
//       // Optionally, you can set the server response in the state if needed:
//       // setServerResponse(response.data);
//     })
//     .catch((error) => {
//       console.error('Error sending meeting data to the server:', error);
//       // Handle any error behavior here
//     });

//     setMeetingName('');
//     setUserName('');
//     setMeetingDate('');
//     setMeetingTime(''); // Reset the time input field
//     setParticipants([]);
//     setEditedMeetingIndex(null); // Reset the edited meeting index after adding/editing a meeting
//   };

//   const handleJoinMeeting = (meetingName) => {
//     console.log(`You have joined the meeting: ${meetingName}`);
//     setCallIsActive(!callIsActive);
//     setSelectedRoomName(meetingName); // Set the selected room name for Jitsi
//   };

//   const handleEditMeeting = (index) => {
//     const meetingToEdit = meetings[index];
//     setMeetingName(meetingToEdit.meetingName);
//     setUserName(meetingToEdit.userName);
//     setMeetingDate(meetingToEdit.meetingDate);
//     setParticipants(meetingToEdit.participants);
//     setEditedMeetingIndex(index);
//     setShowForm(true);
//   };

//   const handleSelectChange = (event) => {
//     setSelectedName(event.target.value);
//   };

//   const handleLogSelectedName = () => {
//     console.log('Selected Name:', selectedName);
//   };

//   return (

    
//     <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
//     {/* <List meetingData={meetingData} handleJoinMeeting={handleJoinMeeting} handleEditMeeting={handleEditMeeting} setCallIsActive={setCallIsActive}/> */}
//       <button className="btn btn-primary btn-lg rounded-circle mb-3" onClick={toggleForm}>
//         <span className="plus">+</span>
//       </button>
//       <div className="label h5">Create Meeting</div>
      
//       {showForm ? (
  

//           <Form2 names={names} handleUserNameChange={handleUserNameChange} handleMeetingNameChange={handleMeetingNameChange} handleMeetingDateChange = {handleMeetingDateChange} handleMeetingTimeChange={handleMeetingTimeChange} handleParticipantChange={handleParticipantChange} handleAddParticipant={handleAddParticipant} handleAddMeeting={handleAddMeeting}/>

//       ) : (
//         <div className="label h5">
//             <List meetingData={meetingData} handleJoinMeeting={handleJoinMeeting} handleEditMeeting={handleEditMeeting} setCallIsActive={setCallIsActive}/>
//         </div>       
//       )}


// {callIsActive ? (
//   <div>
//     VIDEO CALL PART
//     <Jitsi
//       roomName={selectedRoomName} // Use the selected room name as the roomName
//       displayName={userName}
//       onAPILoad={handleAPI}
//       containerStyle={{ width: '800px', height: '600px' }}
//       config={{
//         prejoinPageEnabled: false,
//         disableDeepLinking: true,
//         transcribingEnabled: true,
//         startWithAudioMuted: true,
//         startWithVideoMuted: true,
//         p2p: true,
//       }}
//       interfaceConfig={{
//         APP_NAME: "Video Chat App",
//         TOOLBAR_BUTTONS: ["microphone", "camera", "chat", "hangup"],
//         TOOLBAR_ALWAYS_VISIBLE: true,
//       }}
//     />
//   </div>
// ) : (
//   <div>OTHER PART</div>
// )}
//     </div>
//   );
// }

// export default App;
