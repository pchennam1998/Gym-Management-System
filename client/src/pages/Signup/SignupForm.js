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

function navigateToRole(role) {
      console.log("redirecting to member dashboard");
      navigate("/login");
  }

const handleSubmit = async (e) => {
e.preventDefault();
try {
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
navigateToRole(response.data.type);
} catch (error) {
console.log(error);
}
};

return (
<form onSubmit={handleSubmit}>
<div>
<label>First Name:</label>
<input type="text" value={firstName} onChange={(e) => setFirstname(e.target.value)} />
</div>
<div>
<label>Last Name:</label>
<input type="text" value={lastName} onChange={(e) => setLastname(e.target.value)} />
</div>
<div>
<label>Email:</label>
<input type="email" value={emailAddress} onChange={(e) => setEmailaddress(e.target.value)} />
</div>
<div>
<label>Username(Mail Address):</label>
<input type="email" value={username} onChange={(e) => setUsername(e.target.value)} />
</div>
<div>
<label>Password:</label>
<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
</div>
<button type="submit">Sign up</button>
</form>
);
};

export default SignupForm;