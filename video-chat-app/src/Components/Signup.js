import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Validation from './SignupValidation';
import 'bootstrap/dist/css/bootstrap.min.css';
import Input from './Input';

export default function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
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
      const response = await axios.post('/getsignupdetails', values, {
        headers: {
          'Content-Type': 'application/json',
        },
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
            <Input
              label="Name"
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInput}
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            />
            <br/>
            {errors.name && <span className="invalid-feedback">{errors.name}</span>}
            <Input
              label="Email"
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleInput}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            />
            <br/>
            {errors.email && <span className="invalid-feedback">{errors.email}</span>}
            <Input
              label="Password"
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleInput}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            />
            <br/>
            {errors.password && <span className="invalid-feedback">{errors.password}</span>}
            <button type="submit" className="btn btn-primary btn-block w-100">
              Sign Up
            </button>
            <div className="text-center mt-3">
              <Link to="/" className="btn btn-link">
                <p className="mb-0">Already have an account?</p>
              </Link>
              {/* Add a link to the login page here */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
