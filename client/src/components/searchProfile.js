import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";



import "bootstrap/dist/css/bootstrap.css";
import { Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

let searched = false;

 
export default function LoginScreen() {
    const [profiles, setProfile] = useState([]);

    const { loginWithRedirect, isAuthenticated } = useAuth0();
    if (!isAuthenticated){return(
        <div className="text-center">
            <h2>Please login or signup with Auth0</h2>
            <Button variant="primary" size="lg" onClick={loginWithRedirect}>Auth0</Button>
        </div>

    )
    }    
    else {
        function handleSearch() { 
            async function getProfiles() {
                const response = await fetch(`http://localhost:5000/profile/${document.getElementById("header-search").value}`); //fetch id from label
                if (!response.ok) {
                  const message = `An error occurred: ${response.statusText}`;
                  window.alert(message);
                  return;
                }
                const profiles = await response.json();
                console.log("See profile: ", profiles)
                setProfile(profiles);
                return(profiles);
              }
            getProfiles();
            searched = true;
        }
        

        function searchList(){      
            if(searched){
                if (profiles.length !== 0){
                    return(
                        <Container style={{ maxWidth: '800px' }}>
                        {
                            profiles.map((props) => {                                
                                return (
                                    <ListGroup>
                                        <ListGroup.Item key={props._id}> 
                                        <div>Nickname: {props.nickname}<br/>Email: {props.email}</div>
                                        <Link to={"/otherProfile/" + props._id} className="btn btn-info" onClick={()=> {
                                            
                                        }}> Profile</Link>
                                        </ListGroup.Item>
                                    </ListGroup>
                                    
                                );
                                })
                        }
                        </Container>
                    )
                }else{
                    return(
                        <h5>No result was found.</h5>
                    )
                }
            }   
        }

        return (
            <div className="text-center">
            <h2>Welcome to the search function</h2>
            <form>
                <label htmlFor="header-search">
                    <span className="visually-hidden">Search blog posts</span>
                </label>
                <input
                    type="text"
                    id="header-search"
                    placeholder="Search for users"
                    name="s" 
                />
                <button type="button" onClick={handleSearch}>Search</button>
            </form>
            <h3>Search result:</h3>
            {searchList()}
        </div>
        )
    }
}