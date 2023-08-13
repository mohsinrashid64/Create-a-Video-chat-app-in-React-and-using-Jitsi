import React, { useState } from 'react';
import { Link } from 'react-router-dom';





function Header(props) {


    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
        <Link className="navbar-brand" to="/home">
            <span className="fw-bold">Video Chat</span> App
        </Link>
        <div className="d-flex">
            {/* <button className="btn btn-light me-2" onClick={props.handleCreateMeeting}>
            Create Meeting
            </button> */}
            <Link className="btn btn-danger" to="/">
            <span className="fw-bold">Log out</span> 
            </Link>

        </div>
        </div>
    </nav>
    );
}

export default Header;
