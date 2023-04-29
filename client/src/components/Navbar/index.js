import React from "react";
import './index.css';
import { Nav, NavLink, NavMenu }
	from "./NavbarElements";

const Navbar = () => {
return (
	<>
	
	<Nav>
		<NavMenu>
		<a href="/" ><img src="logo.jpeg" alt="Sample" /></a>
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
