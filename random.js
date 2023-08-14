import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

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
  const [callIsActive, setCallIsActive] = useState(false);
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




  return (
    <div>
    <div className="container mt-5">
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
            participants
          />
        </div>
    </div>
    </div>
  );
  
}

export default App;
