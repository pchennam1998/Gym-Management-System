import React from 'react';
import './style.css'
//import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
//import Login from './Login/login';
//import LoginComponent from './Login/login';
const Home = () => {
return (
	<div class="title">
    
    {/* <img src='ban.jpeg' alt="banner1"/> */}
    
    <div class="himg">
	  <h1>Welcome to FitGym</h1>
	
<div class="button-container">
<button class="button" onClick={handleLoginClick}>Login</button>
  <button class="button" onClick={handleSignupClick}>SignUp</button>
</div></div></div>
);
function handleLoginClick() {
  // Redirect to the login page
  window.location.href = "./login";
}
function handleSignupClick() {
  window.location.href = "./SignupForm"
}
};

export default Home;
