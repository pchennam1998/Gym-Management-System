import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./hcmember.css";
const HCMember = () => {

  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get('/users')
      .then(response => {
        setMembers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

	const navigate = useNavigate();

	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
	  }

	const filteredMembers = members.filter(member =>
		member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
		member.emailAddress.toLowerCase().includes(searchTerm.toLowerCase())
	  );

	const handleLogout = () => {
		console.log("Logout came")
		localStorage.removeItem('auth');
		navigate('/login');
	}

return (
	<div>
	  <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
	  <div className="search-bar">
        <input type="text" placeholder="Search for Non members to enroll them" onChange={handleSearch} />
      </div>
      <div className="member-grid">
        {members
		.filter(member => member.firstName.toLowerCase().includes(searchTerm.toLowerCase()))
		.map(member => (
			<div key={member._id} className="member-card"> {/* Add a card for each member */}
            <div className="member-info">
              <div className="member-name">{member.firstName} - <button className="member-btn">{member.type}</button></div>
              <div className="member-email"><b>{member.emailAddress}</b></div>

            </div>
          </div>
        ))}
      </div>
	</div>
);
};

export default HCMember;
