import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {


    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
        <Link className="navbar-brand" to="/home">
            <span className="fw-bold">Video Chat</span> App
        </Link>
        <div className="d-flex">
            <Link className="btn btn-danger" to="/">
            <span className="fw-bold">Log out</span> 
            </Link>
        </div>
        </div>
    </nav>
    );
}

export default Header;
