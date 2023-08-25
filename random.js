import React from 'react';

function Form(props) {
  const excludedName = props._name; // Replace with the name you want to exclude

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="card p-4 shadow">
        <h2 className="mb-4">Create a New Meeting</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">Your Name</label>
            <input
              type="text"
              className="form-control"
              id="userName"
              value={props.userName}
              onChange={props.handleUserNameChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="meetingName" className="form-label">Meeting Name</label>
            <input
              type="text"
              className="form-control"
              id="meetingName"
              value={props.meetingName}
              onChange={props.handleMeetingNameChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="meetingDate" className="form-label">Date of Meeting</label>
            <input
              type="date"
              className="form-control"
              id="meetingDate"
              value={props.meetingDate}
              onChange={props.handleMeetingDateChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="meetingTime" className="form-label">Time of Meeting</label>
            <input
              type="time"
              className="form-control"
              id="meetingTime"
              value={props.meetingTime}
              onChange={props.handleMeetingTimeChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="participantSelect">Select Participants:</label>
            <div className="d-flex">
              {props.names.length > 0 ? (
                <select
                  className="form-control mr-2"
                  id="participantSelect"
                  onChange={props.handleParticipantChange}
                >
                  <option value="">Select a name</option>
                  {props.names
                    .filter(name => name.name !== excludedName)
                    .map((name) => (
                      <option key={name._id} value={name.name}>
                        {name.name}
                      </option>
                    ))}
                </select>
              ) : (
                <p className="m-0">No names to display. Click the button to fetch names.</p>
              )}
              <button className="btn btn-primary ml-5" type="button" onClick={props.handleAddParticipant}>
                Add Participant
              </button>
            </div>
          </div>

          {/* Display added participants */}
          <div className="form-group">
            <label>Added Participants:</label>
            <ul className="list-group">
              {props.participants.map((participant, index) => (
                <li key={index} className="list-group-item list-group-item-light">{participant}</li>
              ))}
            </ul>
          </div>

          <button type="button" className="btn btn-primary mt-3" onClick={props.handleAddMeeting}>
            Add Meeting
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;


//////// Home

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Jitsi from "react-jitsi";
import { useLocation } from 'react-router';
import React, { useState, useEffect } from 'react';
import Form from "./Form"
import List from "./List"


function Home () {

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
  


export default Home;
