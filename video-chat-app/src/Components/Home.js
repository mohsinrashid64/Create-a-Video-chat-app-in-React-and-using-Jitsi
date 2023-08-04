import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Jitsi from "react-jitsi";

import Form from "./SubComponents/Form"

function App() {

  const [callIsActive, setCallIsActive] = useState(false);













  const handleAPI = async (api) => {
    api.addEventListener("videoConferenceJoined", async () => {
      // let data = {num :  await api.getNumberOfParticipants()} 
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


  return (
    <div>
      <Form />
      {callIsActive ? (
        <div>
          VIDEO CALL PART
          <Jitsi
            roomName={"Apple"}
            displayName={"guy"}
            onAPILoad={handleAPI}
            containerStyle={{ width: '800px', height: '600px' }}
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
        <div>OTHER PART</div>
      )}
    </div>
  );
  
}

export default App;

// <div className="App">
//   {   condition === 'A' ? <ComponentA /> 
//     : condition === 'B' ? <ComponentB />
//     : condition === 'C' ? <ComponentC />
//     : <DefaultComponent />
//   }
// </div>