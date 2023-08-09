import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import Validation from './SignupValidation';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    try {
      let response = await axios.post('http://172.16.2.117:5000/getsignupdetails', values, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('IT WORKS');
      console.log(response);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                id="name"
                placeholder="Enter Name"
                onChange={handleInput}
                name="name"
                value={values.name}
              />
              {errors.name && <span className="invalid-feedback">{errors.name}</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                placeholder="Enter Email"
                onChange={handleInput}
                name="email"
                value={values.email}
              />
              {errors.email && <span className="invalid-feedback">{errors.email}</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                id="password"
                placeholder="Enter Password"
                onChange={handleInput}
                name="password"
                value={values.password}
              />
              {errors.password && <span className="invalid-feedback">{errors.password}</span>}
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Sign Up
            </button>
            <div className="text-center mt-3">
              <p className="mb-0">Already have an account?</p>
              {/* Add a link to the login page here */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}