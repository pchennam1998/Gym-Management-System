import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';
import './SignupForm.css';
import { ErrorResponse } from '@remix-run/router';

const SignupForm = () => {
  const [type, setType] = useState('NM');
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [emailAddress, setEmailaddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setType(type);
      const response = await axios.post('/all/signup', {
        type,
        firstName,
        lastName,
        emailAddress,
        username,
        password,
      });
      console.log(ErrorResponse);
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
       <div className="signup-form__field">
        <label className="signup-form__label">First Name:</label>
        <input type="text" value={firstName} onChange={(e) => setFirstname(e.target.value)} 
        className="signup-form__input" placeholder="Enter your First Name"/>
      </div>
      <div className="signup-form__field">
        <label className="signup-form__label">Last Name:</label>
        <input type="text" value={lastName} onChange={(e) => setLastname(e.target.value)} 
        className="signup-form__input" placeholder="Enter your Last Name"/>
      </div>
      <div className="signup-form__field">
        <label className="signup-form__label">Email:</label>
        <input type="email" value={emailAddress} onChange={(e) => setEmailaddress(e.target.value)} className="signup-form__input" placeholder="Enter your Mail Address"/>
      </div>
      <div className="signup-form__field">
        <label className="signup-form__label">Username:</label>
        <input type="email" value={username} onChange={(e) => setUsername(e.target.value)} 
        className="signup-form__input"  placeholder="Same as above email address"/>
      </div>
      <div className="signup-form__field">
        <label className="signup-form__label">Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="signup-form__input"  placeholder="Enter the password"/>
      </div>
      <button type="submit" className="signup-form__button">Sign up</button>
    </form>
  );
};

export default SignupForm;
