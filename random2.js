import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useLocation } from 'react-router';
import React, { useState, useEffect } from 'react';
import Form from "./Form"

function App () {

  const location = useLocation();
  const _name = location.state?._name || '';
  const _email = location.state?._email || '';  
  const [meetingName, setMeetingName] = useState('');
  const [userName, setUserName] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [participant, setParticipant] = useState('');
  const [participants, setParticipants] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [editedMeetingIndex, setEditedMeetingIndex] = useState(null);
  const [names, setNames] = useState([]);
  // const [meetingData, setMeetingData] = useState([]);

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
    })
    .catch((error) => {
      console.error('Error sending meeting data to the server:', error);
    })
    .finally(() => {
      setMeetingName('');
      setUserName('');
      setMeetingDate('');
      setMeetingTime('');
      setParticipants([]);
      setEditedMeetingIndex(null);

    });
  };

  return (
      
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
          />
        </div>

  

  )
}



export default App;
