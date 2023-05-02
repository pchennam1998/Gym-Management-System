import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [emailAddress, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/forgot-password', { emailAddress });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleForgotPassword}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={emailAddress}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
      <button type="submit">Submit</button>
      <Link to="/login" className="text-body">
                         Login
                    </Link>
       </div>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ForgotPassword;
