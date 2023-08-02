




export default function ConnectForm(props){
    return (
        <div className="container">
            <div className="inner-container">
                <p>Create / Join a Room</p>
                    <input
                        type="text"
                        name="roomName"
                        placeholder="Room name"
                        onChange={props.handleInputs}
                    />
                    <input
                        type="text"
                        name="participantsName"
                        placeholder="Your name"
                        onChange={props.handleInputs}
                    />
                <button onClick={props.joinMeeting}>CONNECT</button>
            </div>
        </div>
    )
}

 
