import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState,useEffect } from 'react';
import Jitsi from "react-jitsi";
import axios from 'axios';
import Form from "./SubComponents/Form"

function App() {
  const [showForm, setShowForm] = useState(false);
  const [meetingName, setMeetingName] = useState('');
  const [userName, setUserName] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [participant, setParticipant] = useState('');
  const [participants, setParticipants] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [editedMeetingIndex, setEditedMeetingIndex] = useState(null);
  const [callIsActive, setCallIsActive] = useState(false);
  const [names, setNames] = useState([]);


//////////
  const fetchNames = () => {
    axios
      .get('http://localhost:5000/api/names')
      .then((response) => {
        setNames(response.data);
      })
      .catch((error) => {
        console.error('Error fetching names:', error);
      });
  };

  useEffect(() => {
    fetchNames();
  }, []);
///////////

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

  const handleParticipantChange = (event) => {
    setParticipant(event.target.value);
  };

  const handleAddParticipant = async () => {
    if (participant.trim() === '') {
      alert('Please enter a valid participant name.');
      return;
    }

    try {
      // Send the participant name and user ID to the server
      const response = await axios.post('http://localhost:5000/updateParticipantName', {
        participantNames: participant,
        name: 'Mohsin' // Replace this with the user ID obtained during login
      });

      console.log('Participant name added successfully:', response.data);
      // Handle any success behavior here
    } catch (error) {
      console.error('Error occurred while adding participant name:', error);
      // Handle any error behavior here
    }
    setParticipants([...participants, participant]);
    setParticipant('');
  };


  // const handleAddParticipant = () => {
  //   if (participant.trim() === '') {
  //     alert('Please enter a valid participant name.');
  //     return;
  //   }

  //   setParticipants([...participants, participant]);
  //   setParticipant('');
  //   const response =  axios.post('http://localhost:5000/updateParticipantName', values);
  // };

  const handleAddMeeting = () => {
    if (!meetingName || !userName || !meetingDate || participants.length === 0) {
      alert('Please fill in all the details and add at least one participant before adding a meeting.');
      return;
    }

    const newMeeting = {
      meetingName,
      userName,
      meetingDate,
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

    setMeetingName('');
    setUserName('');
    setMeetingDate('');
    setParticipants([]);
    setEditedMeetingIndex(null); // Reset the edited meeting index after adding/editing a meeting
  };

  const handleJoinMeeting = (meetingName) => {
    console.log(`You have joined the meeting: ${meetingName}`);
    setCallIsActive(!callIsActive);
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


  return (
   

      <Form/>


    //   {callIsActive ? (
    //     <div>VIDEO CALL PART
    //     <Jitsi
    //     roomName={"Apple"}
    //     displayName={"guy"}
    //     onAPILoad={handleAPI}
    //     containerStyle={{ width: '800px', height: '600px' }}
    //     // onMeetingJoined={(url) => handleMeetingJoined(url)}

    //     config={{
    //       prejoinPageEnabled: false,
    //       disableDeepLinking: true,
    //       transcribingEnabled: true,
    //       startWithAudioMuted: true,
    //       startWithVideoMuted: true,
    //       p2p: true,
    //     }}
    //     interfaceConfig={{
    //       APP_NAME: "Video Chat App",
    //       TOOLBAR_BUTTONS: ["microphone", "camera", "chat", "hangup"],
    //       TOOLBAR_ALWAYS_VISIBLE: true,
    //     }}
    //   />
    //     </div>

    //   ) : (
    //     <div>OTHER PART</div>
    //   )}



    // </div>
  );
}

export default App;

// <div className="App">
//   {   condition === 'A' ? <ComponentA /> 
//     : condition === 'B' ? <ComponentB />
//     : condition === 'C' ? <ComponentC />
//     : <DefaultComponent />
//   }
// </div>