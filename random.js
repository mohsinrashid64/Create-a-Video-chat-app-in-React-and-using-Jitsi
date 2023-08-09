return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <h1>{props.email}</h1>
      <button className="btn btn-primary btn-lg rounded-circle mb-3" onClick={() => setShowForm(!showForm)}>
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
            <label htmlFor="meetingTime">Time of Meeting:</label>
            <input
              type="time"
              className="form-control"
              id="meetingTime"
              value={meetingTime}
              onChange={handleMeetingTimeChange}
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
        <div>
          <div className="label h5">Create Meeting</div>
          {meetingData.length > 0 && (
            <div className="mt-5">
              <h3>Meetings Added:</h3>
              <table className="table table-bordered">
                {/* ... Your table JSX ... */}
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );