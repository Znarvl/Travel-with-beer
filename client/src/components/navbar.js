import React from "react";
 
import "bootstrap/dist/css/bootstrap.css";
 
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./logoutButton";



 export default function Navbar() {
  const { isAuthenticated, user } = useAuth0();
  function IsLoggedIn(){
    if (isAuthenticated){
      return <div>{user.name}</div>
    }
    else {
      return <div></div>
    }
  }

 return (
  
   <div>
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
       <NavLink className="navbar-brand" to="/">
       <img style={{"width" : 10 + '%'}} src="/granges.jpeg"></img>
       </NavLink>
       <IsLoggedIn/>
       <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav ml-auto">
          <li className="nav-item" key='2'><LogoutButton/></li>
           
         </ul>
       </div>
     </nav>
   </div>
   
 );
}