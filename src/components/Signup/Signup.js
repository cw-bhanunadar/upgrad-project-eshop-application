import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNumber: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      await axios.post('https://dev-project-ecommerce.upgrad.dev/api/users', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        contactNumber: formData.contactNumber,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
      navigate('/products');
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Sign up failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5%' }}>
      <h2>Sign Up</h2>
      <div style={{display: 'flex', flexDirection: 'column', width: '30%'}}>
      <input
        type="text"
        name="firstName"
        placeholder="First Name*"
        value={formData.firstName}
        onChange={handleChange}
        className="input-style"
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name*"
        value={formData.lastName}
        onChange={handleChange}
        className="input-style"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address*"
        value={formData.email}
        onChange={handleChange}
        className="input-style"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password*"
        value={formData.password}
        onChange={handleChange}
        className="input-style"
        required
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password*"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="input-style"
        required
      />
      <input
        type="text"
        name="contactNumber"
        placeholder="Contact Number*"
        value={formData.contactNumber}
        onChange={handleChange}
        className="input-style"
        required
      />
      <button type="submit" style={{backgroundColor:"#1976d2", height: "30px", color: "white"}}>Sign Up</button>
      <p>
        Already have an account? <a href="/login">Sign in</a>
      </p>
      </div>
    </form>
  );
}

export default Signup;
