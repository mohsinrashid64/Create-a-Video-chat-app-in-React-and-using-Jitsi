import React from 'react';

function List(props) {
  return (
    <div>
      {props.meetingData.length > 0 && (
        <div className="mt-5">
          <h3 className="mb-4 text-center">Upcoming Meetings</h3>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {props.meetingData.map((meeting, index) => (
              <div className="col" key={index}>
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{meeting.meetingName}</h5>
                    <p className="card-text"><b>Date of Meeting:</b> {meeting.meetingDate}</p>
                    <p className="card-text"><b>Participants:</b> {meeting.participants.join(', ')}</p>
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-success me-2"
                        onClick={() => props.handleJoinMeeting(meeting.meetingName)}
                      >
                        Join
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default List;
