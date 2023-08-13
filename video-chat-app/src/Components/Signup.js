import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Validation from './SignupValidation';
import 'bootstrap/dist/css/bootstrap.min.css';

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
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                id="name"
                name="name"
                value={values.name}
                onChange={handleInput}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                value={values.email}
                onChange={handleInput}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                id="password"
                name="password"
                value={values.password}
                onChange={handleInput}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            <button type="submit" className="btn btn-primary btn-block w-100">
              Sign Up
            </button>
            <div className="text-center mt-3">
              <Link to="/" className="btn btn-link">
                <p className="mb-0">Already have an account?</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
