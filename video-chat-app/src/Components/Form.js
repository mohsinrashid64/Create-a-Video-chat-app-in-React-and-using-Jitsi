import React, { useState } from 'react';

function Form(props) {
  const excludedName = 'NameToExclude'; // Replace with the name you want to exclude
  const [addedParticipants, setAddedParticipants] = useState([]);

  const handleAddParticipant = () => {
    const selectedName = document.getElementById('participantSelect').value;
    if (selectedName && !addedParticipants.includes(selectedName)) {
      setAddedParticipants([...addedParticipants, selectedName]);
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="card p-4 shadow">
        <button
          className="btn btn-primary mb-3"
          onClick={() => props.setShowForm(false)}
        >
          <span className="arrow-back">&lt;</span> Back to List
        </button>
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
              <button className="btn btn-primary ml-2" type="button" onClick={handleAddParticipant}>
                Add Participant
              </button>
            </div>
            {addedParticipants.length > 0 && (
              <div className="mt-3 bg-light p-3 rounded">
                <p className="mb-1"><b>Added Participants:</b></p>
                <ul className="list-unstyled">
                  {addedParticipants.map((participant, index) => (
                    <li key={index} className="mb-2">{participant}</li>
                  ))}
                </ul>
              </div>
            )}
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
