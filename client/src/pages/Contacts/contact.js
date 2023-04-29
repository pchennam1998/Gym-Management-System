import React from 'react';
import './contact.css';

function Contact() {
  const box1Data = [
    { name: 'John Doe', email: 'johndoe@example.com', phone: '123-456-7890' },
    { name: 'Jane Smith', email: 'janesmith@example.com', phone: '987-654-3210' }
  ];
  const box2Data = [
    { name: 'Bob Johnson', email: 'bobjohnson@example.com', phone: '555-555-5555' },
	{ name: 'Mahesh Naik', email: 'maheshnaik@gmail.com', phone: '489-234-2322'}
  ];

  return (
    <>
	<div className="grid-container">
      <div className="grid-box box1">
        <h4>Contact Details for San Jose Downtown</h4><br></br>
        {box1Data.map((contact, index) => (
          <p key={index} className="contact-item">
			<b>
            <div className="contact-name"><b>Name: </b>{contact.name}</div>
            <div className="contact-email"><b>Email: </b>{contact.email}</div>
            <div className="contact-phone"><b>Phone: </b> {contact.phone}</div>
			</b><br></br>
          </p>
        ))}
      </div>
	  <div className="grid-box box2">
	  <h4>Contact Details for Santa Clara</h4><br></br>
        {box2Data.map((contact, index) => (
          <p key={index} className="contact-item">
			<b>
            <div className="contact-name"><b>Name: </b>{contact.name}</div>
            <div className="contact-email"><b>Email: </b>{contact.email}</div>
            <div className="contact-phone"><b>Phone: </b> {contact.phone}</div>
			</b><br></br>
          </p>
        ))}
      </div>
    </div>
  </>
  );
}

export default Contact;
