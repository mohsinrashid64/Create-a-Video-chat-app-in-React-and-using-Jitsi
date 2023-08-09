import React from 'react';

function Form(props) {

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="card p-4 shadow">
        <h3 className="mb-4">{props.editedMeetingIndex !== null ? 'Edit Meeting' : 'Create Meeting'}</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">Your Name:</label>
            <input
              type="text"
              className="form-control"
              id="userName"
              value={props.userName}
              onChange={props.handleUserNameChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="meetingName" className="form-label">Meeting Name:</label>
            <input
              type="text"
              className="form-control"
              id="meetingName"
              value={props.meetingName}
              onChange={props.handleMeetingNameChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="meetingDate" className="form-label">Date of Meeting:</label>
            <input
              type="date"
              className="form-control"
              id="meetingDate"
              value={props.meetingDate}
              onChange={props.handleMeetingDateChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="meetingTime" className="form-label">Time of Meeting:</label>
            <input
              type="time"
              className="form-control"
              id="meetingTime"
              value={props.meetingTime}
              onChange={props.handleMeetingTimeChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Participants:</label>
            <div className="input-group">
              {props.names.length > 0 ? (
                <select
                  className="form-select"
                  onChange={props.handleParticipantChange}
                >
                  <option value="">Select a name</option>
                  {props.names.map((name) => (
                    <option key={name._id} value={name.name}>
                      {name.name}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="m-0">No names to display. Click the button to fetch names.</p>
              )}
              <button className="btn btn-primary" type="button" onClick={props.handleAddParticipant}>
                Add Participant
              </button>
            </div>
          </div>
          <button type="button" className="btn btn-primary" onClick={props.handleAddMeeting}>
            Add Meeting
        </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
