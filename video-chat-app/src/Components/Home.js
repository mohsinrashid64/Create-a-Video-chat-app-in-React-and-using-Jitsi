import React, { useState } from "react";
import "../Styles/Connect.css";
import 'bootstrap/dist/css/bootstrap.min.css';


import Jitsi from "react-jitsi";
import axios from 'axios';

// const Home = () => {
//   const [meetingName, setMeetingName] = useState('');
//   const [scheduledTime, setScheduledTime] = useState('');

//   const handleCreateMeeting = () => {
//     // Implement the logic to create a new meeting
//     console.log('Creating a new meeting with name:', meetingName);
//   };

//   const handleScheduleMeeting = () => {
//     // Implement the logic to schedule a meeting for the specified time
//     console.log('Scheduling a meeting for:', scheduledTime);
//   };

//   return (
//     <div>
//       <h1>Video Chat App</h1>

//       <div>
//         <h2>Create a New Meeting</h2>
//         <input
//           type="text"
//           placeholder="Enter Meeting Name"
//           value={meetingName}
//           onChange={(e) => setMeetingName(e.target.value)}
//         />
//         <button onClick={handleCreateMeeting}>Create</button>
//       </div>

//       <div>
//         <h2>Schedule a Meeting</h2>
//         <input
//           type="datetime-local"
//           value={scheduledTime}
//           onChange={(e) => setScheduledTime(e.target.value)}
//         />
//         <button onClick={handleScheduleMeeting}>Schedule</button>
//       </div>
//     </div>
//   );
// };

// export default Home;


///////////////////////////////////
const Home = () => {

  const [callIsActive, setCallIsActive] = useState(false);
  const [inputs, setInputs] = useState({
    roomName: "",
    participantsName: "",
  });

  function handleInputs(event) {
    const { value, name } = event.target;
    setInputs((prevInputs) => {
      if (name === "roomName") {
        return {
          roomName: value,
          participantsName: prevInputs.participantsName,
        };
      } else if (name === "participantsName") {
        return {
          roomName: prevInputs.roomName,
          participantsName: value,
        };
      }
    });
  }

  const handleAPI = async (api) => {
    

    api.addEventListener("videoConferenceJoined", async () => {
      let data = {num :  await api.getNumberOfParticipants()} 
      // await axios.post('/api/set-number-of-participants', data)
      console.log("ROOMS INFO",api.getRoomsInfo())
    });
    let check = true
    api.addEventListener('videoConferenceLeft',  function ()  {
      if ( check === true){
        console.log("ROOMS INFO",api.getRoomsInfo())

        let data = {num :  api.getNumberOfParticipants() * -1} 
        console.log("PARTICIPANT LEFT",data)
        // axios.post('/api/decrease-number-of-participants',data)
        check =false
        setCallIsActive(false);

      }
    })  
  };
  async function joinMeeting() {
    console.log("JOING MEETING FUNCTION")
    // let responseOfNumOfParticipants = await axios.get('/api/send-number-of-participants')
    // console.log("allowTwoParticipants FUNCTION:", responseOfNumOfParticipants.data.num)
    // let numberOfParticipants = responseOfNumOfParticipants.data.num
    // if (numberOfParticipants < 2){
      setCallIsActive(true);
    // } else {
      // alert("YO MAN THERE ARE ALREADY TWO PARTICPANTS HERE SO GET THE HELL OUT OF HERE YOU MEGALOMANIACAL JESTER")
    // } 
  }



  return (

    

    <div className="main-container">

      <div className="row">
        <div className="col">
          {callIsActive ? (
            <div className="jitsi-container">
              <Jitsi
                roomName={inputs.roomName}
                displayName={inputs.participantsName}
                onAPILoad={handleAPI}
                containerStyle={{ width: '800px', height: '600px' }}
                // onMeetingJoined={(url) => handleMeetingJoined(url)}

                config={{
                  prejoinPageEnabled: false,
                  disableDeepLinking: true,
                  transcribingEnabled: true,
                  startWithAudioMuted: true,
                  startWithVideoMuted: true,
                  p2p: true,
                }}
                interfaceConfig={{
                  APP_NAME: "Video Chat App",
                  TOOLBAR_BUTTONS: ["microphone", "camera", "chat", "hangup"],
                  TOOLBAR_ALWAYS_VISIBLE: true,
                }}
              />
            </div>
          ) : (
            <div className="container">
              <div className="inner-container">
                <p>Create / Join a Room</p>
                <input
                  type="text"
                  name="roomName"
                  placeholder="Room name"
                  onChange={handleInputs}
                />
                <input
                  type="text"
                  name="participantsName"
                  placeholder="Your name"
                  onChange={handleInputs}
                />
                <button onClick={joinMeeting}>CONNECT</button>
              </div>
            </div>
          )}
        </div>    
      </div>
    </div>
  );
};

export default Home;


