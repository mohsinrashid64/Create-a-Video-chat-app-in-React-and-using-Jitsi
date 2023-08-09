import React from 'react';
import Input from './Input';

function Form2(props) {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="card p-4 shadow">
        <h2 className="mb-4">Create a New Meeting</h2>
        <form>
          <Input
            label="Your Name"
            type="text"
            id="userName"
            value={props.userName}
            onChange={props.handleUserNameChange}
          />

          <Input
            label="Meeting Name"
            type="text"
            id="meetingName"
            value={props.meetingName}
            onChange={props.handleMeetingNameChange}
          />

          <Input
            label="Date of Meeting"
            type="date"
            id="meetingDate"
            value={props.meetingDate}
            onChange={props.handleMeetingDateChange}
          />

          <Input
            label="Time of Meeting"
            type="time"
            id="meetingTime"
            value={props.meetingTime}
            onChange={props.handleMeetingTimeChange}
          />

          <div className="form-group">
            <label htmlFor="participantSelect">Select a name:</label>
            <div className="d-flex">
              {props.names.length > 0 ? (
                <select
                  className="form-control mr-2"
                  id="participantSelect"
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
              <button className="btn btn-primary ml-5" type="button" onClick={props.handleAddParticipant}>
                Add Participant
              </button>
            </div>
          </div>

          <button type="button" className="btn btn-primary mt-3" onClick={props.handleAddMeeting}>
            {props.editedMeetingIndex !== null ? 'Save Changes' : 'Add Meeting'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form2;
