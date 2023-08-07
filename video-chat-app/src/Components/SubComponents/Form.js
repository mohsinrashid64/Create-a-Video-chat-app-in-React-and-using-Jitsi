import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState,useEffect } from 'react';
import axios from 'axios';


function Form() {
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
  const [selectedName, setSelectedName] = useState('');


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

  const handleSelectChange = (event) => {
    console.log("handleSelectChange")
    setSelectedName(event.target.value);
  };
  const handleLogSelectedName = () => {
    console.log('Selected Name:', selectedName);
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <button className="btn btn-primary btn-lg rounded-circle mb-3" onClick={toggleForm}>
        <span className="plus">+</span>
      </button>
      {showForm ? (
        <form>
          <div className="form-group">
            <label htmlFor="userName">Your Name:</label>
            <input
              type="text"
              className="form-control"
              id="userName"
              value={userName}
              onChange={handleUserNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="meetingName">Meeting Name:</label>
            <input
              type="text"
              className="form-control"
              id="meetingName"
              value={meetingName}
              onChange={handleMeetingNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="meetingDate">Date of Meeting:</label>
            <input
              type="date"
              className="form-control"
              id="meetingDate"
              value={meetingDate}
              onChange={handleMeetingDateChange}
            />
          </div>
          <div className="form-group">
            <div className="input-group mb-3">

              {names.length > 0 ? (
              <div>


                <label>
                    Select a name:
                    <select onChange={handleParticipantChange}>
                    <option value="">Select a name</option>
                    {names.map((name) => (
                        <option key={name._id} value={name.name}>
                        {name.name}
                        </option>
                    ))}
                    </select>
                </label>
                <button type='button' onClick={handleLogSelectedName}>Log Selected Name</button>
              </div>
            ) : (
              <p>No names to display. Click the button to fetch names.</p>
            )}
              <div className="input-group-append">
                <button className="btn btn-primary" type="button" onClick={handleAddParticipant}>
                  Add Participant
                </button>
              </div>
            </div>
          </div>
          <button type="button" className="btn btn-primary" onClick={handleAddMeeting}>
            {editedMeetingIndex !== null ? 'Save Changes' : 'Add Meeting'}
          </button>
        </form>
      ) : (
        <div className="label h5">Create Meeting</div>
      )}

      {meetings.length > 0 && (
        <div className="mt-5">
          <h3>Meetings Added:</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Meeting Name</th>
                <th>Your Name</th>
                <th>Date of Meeting</th>
                <th>Participants</th>
                <th>Join</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((meeting, index) => (
                <tr key={index}>
                  <td>{meeting.meetingName}</td>
                  <td>{meeting.userName}</td>
                  <td>{meeting.meetingDate}</td>
                  <td>{meeting.participants.join(', ')}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => handleJoinMeeting(meeting.meetingName)}
                    >
                      Join
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => handleEditMeeting(index)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}

export default Form;

// <div className="App">
//   {   condition === 'A' ? <ComponentA /> 
//     : condition === 'B' ? <ComponentB />
//     : condition === 'C' ? <ComponentC />
//     : <DefaultComponent />
//   }
// </div>