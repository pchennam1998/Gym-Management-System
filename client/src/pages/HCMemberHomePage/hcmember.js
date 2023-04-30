import React from 'react';
import { useNavigate } from "react-router-dom";

const HCMember = () => {

	const navigate = useNavigate();

	const handleLogout = () => {
		console.log("Logout came")
		localStorage.removeItem('auth');
		navigate('/login');
	}

return (
	<div>
	<button className="btn btn-danger" onClick={handleLogout}>Logout</button>
	<h1>Health Club Member Home Page</h1>
	</div>
);
};

export default HCMember;
