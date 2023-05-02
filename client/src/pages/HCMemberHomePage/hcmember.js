import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./hcmember.css";

const HCMember = () => {
  const [members, setMembers] = useState([]);
  const [nonmembers, SetNonmembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [nsearchTerm, setNSearchTerm] = useState("");

  useEffect(() => {
    axios.get('/users')
      .then(response => {
        setMembers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get('/nonusers')
      .then(response => {
        SetNonmembers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleSearch1 = (event) => {
    setNSearchTerm(event.target.value);
  }

  const handleLogout = () => {
    console.log("Logout came")
    localStorage.removeItem('auth');
    navigate('/login');
  }

  const handleCheckin = (member) => {
	console.log('*********');
	console.log(member.emailAddress);
    axios.post('/checkin', { emailAddress: member.emailAddress })
      .then(response => {
        const updatedMembers = members.map(m => {
          if (m._id === member._id) {
            return { ...m, checkInTime: response.data.checkInTime };
          }
          return m;
        });
		console.log(member);
        setMembers(updatedMembers);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleCheckout = (member) => {
	console.log(member.checkInTime);
    axios.post('/checkout', { emailAddress: member.emailAddress })
      .then(response => {
        const updatedMembers = members.map(m => {
          if (m._id === member._id) {
            return { ...m, checkOutTime: response.data.checkOutTime };
          }
          return m;
        });
        setMembers(updatedMembers);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const filteredMembers = members.filter(member =>
    member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.emailAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredNonMembers = nonmembers.filter(nonmember =>
    nonmember.firstName.toLowerCase().includes(nsearchTerm.toLowerCase()) ||
    nonmember.emailAddress.toLowerCase().includes(nsearchTerm.toLowerCase())
  );

//   const MTypeMembers = filteredMembers.filter(member => member.type === "M");
//   const NMTypeMembers = filteredMembers.filter(member => member.type === "NM");

  return (
    <div>
      <button style={{float: 'right'}} className="btn btn-danger" onClick={handleLogout}>Logout</button>
	  <h3><br></br><b>CHECK-IN/CHECK-OUT Members</b></h3>
      <div className="search-bar">
        <input type="text" placeholder="Search for members to check the time" onChange={handleSearch} />
      </div>
      <div className="member-grid">
        {filteredMembers.map(member => (
          <div key={member._id} className="member-card">
            <div className="member-info">
              <div className="member-name">{member.firstName} <button className="member-btn">{member.type}</button></div>
              <div className="member-email"><b>{member.emailAddress}</b></div>
              <div className="member-actions">
                {(!member.checkInTime) && 
                  <button className="checkin-btn" onClick={() => handleCheckin(member)}>Check In</button>
                }
                {(member.checkInTime && !member.checkOutTime) &&
                  <button className="checkout-btn" onClick={() => handleCheckout(member)}>Check Out</button>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
	  <div class="nm-member-list nm-type">
		<h3><b>Enroll Non members for different services</b></h3>
	  <div className="search-bar">
        <input type="text" placeholder="Search for non members to enroll them" onChange={handleSearch1} />
      </div>
		{filteredNonMembers.map(nonmember => (
      <div key={nonmember._id} class="member-card nm-type">
        <div class="nm-member-info">
          <div class="nm-member-name">{nonmember.firstName} {nonmember.lastName} <Link to={`/enrollmember?email=${nonmember.emailAddress}`}>
      <button className="enroll-btn">Enroll</button>
    </Link></div>
          {/* <div class="nm-member-email"><b>{nonmember.emailAddress}</b></div> */}
        </div>
      </div>
    ))}
  </div>
    </div>
	// (member.checkInTime && !member.checkOutTime) &&
  );
};

export default HCMember;
