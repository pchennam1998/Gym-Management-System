import React from "react";
import './index.css';
import { Nav, NavLink, NavMenu }
	from "./NavbarElements";

const Navbar = (props) => {
return (
	<>
	
	<Nav>
		<NavMenu>
			{props.loginstate && ""}
		<a><img src="logo.jpeg" alt="Sample" /></a>
			{/* <NavLink to={(localStorage.getItem("auth") && ((JSON.parse(localStorage.getItem("auth")).employees[0].userRole==="NM" )? "/member":"/" ) )} activeStyle>
				Home
			</NavLink> */}
			<NavLink to="/" activeStyle>
				Home
			</NavLink>
		<NavLink to="/service" activeStyle>
			Service
		</NavLink>
		<NavLink to="/classes" activeStyle>
			Classes
		</NavLink>
		<NavLink to="/pricing" activeStyle>
			Pricing
		</NavLink>
		<NavLink to="/contact" activeStyle>
			Contact Us
		</NavLink>
		</NavMenu>
	</Nav>
	</>
);
};

export default Navbar;
