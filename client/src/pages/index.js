import React from 'react';
import './style.css'
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';
import Login from './login';
import LoginComponent from './login';
const Home = () => {
return (
	<div class="title">
    
    {/* <img src='ban.jpeg' alt="banner1"/> */}
    
    <div class="himg">
	<h1>Welcome to FitGym</h1>
	
<div class="button-container">
<button class="button" onClick={handleLoginClick}>Login</button>
  <button class="button">SignUp</button>
</div></div></div>
);
function handleLoginClick() {
  // Redirect to the login page
  window.location.href = "./login";
}
};

export default Home;
