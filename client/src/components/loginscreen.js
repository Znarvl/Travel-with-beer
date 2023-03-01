import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.css";
import { Button } from "react-bootstrap";



 
export default function LoginScreen() {
    const { user, loginWithRedirect, isAuthenticated } = useAuth0();
    if (!isAuthenticated){return(
        <div className="text-center">
            <h2>Please login or signup with Auth0</h2>
            <Button variant="primary" size="lg" onClick={loginWithRedirect}>Auth0</Button>
        </div>

    )
    }
    else {
        return (
            <div className="text-center">
            <h2>Welcome {user.name}</h2>
            <Link to="/profile" className="btn btn-info">Profile</Link>
            <Link to="/projects" className="btn btn-info">Projects</Link>
            <Link to="/createproject" className="btn btn-info">Create project</Link>
            <Link to="/searchProfile" className="btn btn-info">Search for profiles</Link>
            <Link to="/settings" className="btn btn-info">Settings</Link>
        </div>
        )
    }
}