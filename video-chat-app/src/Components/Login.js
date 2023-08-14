import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const onChange = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("Login button try Part")
      const response = await axios.post('/api/postlogindetails', values, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        console.log('User exists!');
        console.log(response.data.name);
        navigate('/home', { state: { _name: response.data.name, _email: values.email } });

      } else {
        console.log('User does not exist!');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Log In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email" // Specify the name attribute
                value={values.email}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password" // Specify the name attribute
                value={values.password}
                onChange={onChange}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block mt-3 w-100">
              Log in
            </button>
            <div className="text-center mt-3">
              <p className="mb-0">Don't have an account?</p>
              <Link to="/signup" className="btn btn-link">
                Create Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
