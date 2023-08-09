import React from 'react';

function List(props) {
  return (
    <div>
      {props.meetingData.length > 0 && (
        <div className="mt-5">
          <h3 className="mb-4">Meetings Added:</h3>
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-primary">
                <tr>
                  <th>Meeting Name</th>
                  <th>Date of Meeting</th>
                  <th>Participants</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {props.meetingData.map((meeting, index) => (
                  <tr key={index}>
                    <td>{meeting.meetingName}</td>
                    <td>{meeting.meetingDate}</td>
                    <td>{meeting.participants.join(', ')}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-success me-2"
                        onClick={() => props.handleJoinMeeting(meeting.meetingName)}
                      >
                        Join
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default List;
