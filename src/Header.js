import React, { Component } from 'react';
import {Link} from "react-router-dom";
import './Header.css';
export class Header extends Component {
 render() {
 
    return (
        
		 				<ul>	
		 					<li><Link className="a" to="/">home</Link></li>
		 					<li><Link className="a" to="admin">Admin</Link></li>
		 					<li><Link className="a" to="user">User</Link></li>
		
		 				</ul>
		 			
    );
  }
}

export default Header;
