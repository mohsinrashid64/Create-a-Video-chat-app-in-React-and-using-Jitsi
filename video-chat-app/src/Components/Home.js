import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Jitsi from "react-jitsi";
import { useLocation } from 'react-router';
import React, { useState, useEffect } from 'react';
import Form from "./Form"
import List from "./List"


function App () {

  const location = useLocation();
  const _name = location.state?._name || '';
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

  const [selectedRoomName, setSelectedRoomName] = useState('');
  const [names, setNames] = useState([]);
  const [meetingData, setMeetingData] = useState([]);

  useEffect(() => {
    if (_name) {
      setParticipants([_name]); 
    }
  }, []);

  useEffect(() => {
    console.log("PARTICIPANTS:", participants);
  }, [participants]);

  const handleAPI = async (api) => {
    api.addEventListener("videoConferenceJoined", async () => {
      console.log("ROOMS INFO",api.getRoomsInfo())
    });
    let check = true
    api.addEventListener('videoConferenceLeft',  function ()  {
      if ( check === true){
        console.log("ROOMS INFO",api.getRoomsInfo())

        let data = {num :  api.getNumberOfParticipants() * -1} 
        console.log("PARTICIPANT LEFT",data)
        check =false
        setCallIsActive(false);

      }
    })  
  };

  // Function to fetch names from the backend
  const fetchNames = () => {
    axios
      .get('/api/names')
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
  const fetchMeetingData = () => {
    axios
      .get('/api/meetingData', {
        params: {
          email: _email,
        },
      })
      .then((response) => {
        console.log("response.data",response.data)
        setMeetingData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching meeting data:', error);
      });
  };

  useEffect(() => {
    fetchMeetingData();
  }, []); 

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
    setParticipant(_name);
  };

  const handleAddMeeting = async () => {
    if (!meetingName || !userName || !meetingDate || !meetingTime || participants.length === 0) {
      alert('Please fill in all the details and add at least one participant before adding a meeting.');
      return;
    }

    const newMeeting = {
      email : _email,
      meetingName,
      userName,
      meetingDate: meetingDate + ' ' + meetingTime, 
      participants,
    };

    if (editedMeetingIndex !== null) {
      const updatedMeetings = [...meetings];
      updatedMeetings[editedMeetingIndex] = newMeeting;
      setMeetings(updatedMeetings);
    } else {
      setMeetings([...meetings, newMeeting]);
    }

    axios
    .post('/api/addMeeting', newMeeting)
    .then((response) => {
      console.log('Server response:', response.data);
      // After successful addition, fetch updated meeting data
      fetchMeetingData();
    })
    .catch((error) => {
      console.error('Error sending meeting data to the server:', error);
    })
    .finally(() => {
      // Reset other form fields and state variables
      setMeetingName('');
      setUserName('');
      setMeetingDate('');
      setMeetingTime('');
      setParticipants([]);
      setEditedMeetingIndex(null);
      setShowForm(false);
    });
  };

  const handleJoinMeeting = (meetingName) => {
    console.log(`You have joined the meeting: ${meetingName}`);
    setCallIsActive(!callIsActive);
    setSelectedRoomName(meetingName); 
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
  return (
    <div>
      
    
    <div className="container mt-5">
      
      {console.log("NAME",_name)}
      {showForm && !callIsActive ? (
        <div className="mb-4">
          <Form
            _name={_name}
            names={names}
            handleUserNameChange={handleUserNameChange}
            handleMeetingNameChange={handleMeetingNameChange}
            handleMeetingDateChange={handleMeetingDateChange}
            handleMeetingTimeChange={handleMeetingTimeChange}
            handleParticipantChange={handleParticipantChange}
            handleAddParticipant={handleAddParticipant}
            handleAddMeeting={handleAddMeeting}
            setShowForm ={setShowForm}
            participants={participants}
          />
        </div>
      ) : !callIsActive ? (
        <div>
          {/* <h3 className="text-center mb-4">Video Chat App</h3> */}

          <List
            meetingData={meetingData}
            handleJoinMeeting={handleJoinMeeting}
            handleEditMeeting={handleEditMeeting}
            setCallIsActive={setCallIsActive}
          />

          <div className="d-flex justify-content-center align-items-center mt-4 mb-6">
            <button
              className="btn btn-primary btn-lg rounded-circle"
              onClick={() => setShowForm(true)}
            >
              <span className="plus">+</span>
            </button>
            {/* <p className="ms-2 mb-0">Add Meeting</p> */}
          </div>
        </div>
      ) : null}

      {callIsActive ? (
        <div className="mt-4">
          <Jitsi
            roomName={selectedRoomName}
            displayName={_name}
            onAPILoad={handleAPI}
            containerStyle={{ width: '1000px', height: '750px' }}
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
    </div>
  );
  
}



export default App;
