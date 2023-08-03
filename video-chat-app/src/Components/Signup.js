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
      let response = await axios.post('http://localhost:5000/getsignupdetails', values, {
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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
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
            <div className="form-group">
              <label htmlFor="email">Email</label>
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
            <div className="form-group">
              <label htmlFor="password">Password</label>
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
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}