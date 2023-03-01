import React, {useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {
    const { user, loginWithRedirect, isAuthenticated } = useAuth0();
    let email = user
    const [name, setName] = useState('');
    const [totMeters, setMeters] = useState('');
    const navigate = useNavigate();


    async function onSubmit(e){
        e.preventDefault();
        console.log(totMeters)
        const projectInformation = {
            name: name,
            totMeters: totMeters,
            admin: email.name,
            users: email.name

        }
        // Create project
        await fetch("http://localhost:5000/project/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectInformation),
        })
        .catch(error => {
          window.alert(error);
          return;
        });

        // Get projects owners user ID 
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/user/${email.email}`);
        const user = await response.json();

        const user_project = { 
            project: name
        };

        // Add project to user 
        await fetch(`http://localhost:5000/user/project/add/${user._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user_project),
        })
        .catch(error => {
          window.alert(error);
          return;
        });

        window.alert("Project has been created.")
        navigate("/");

    }
    
    if (!isAuthenticated){return(
        <div className="text-center">
            <h2>Please login or signup with Auth0</h2>
            <Button variant="primary" size="lg" onClick={loginWithRedirect}>Auth0</Button>
        </div>
    )
    }
        return (
        <div class="row justify-content-center align-items-center">
          <Form onSubmit={onSubmit}  style={{width: '18rem'}}>
          <Form.Group className="mb-3" controlId="name" id="name">
            <Form.Label>Project name</Form.Label>
            <Form.Control  type="text"
            id="name"
            name="name"
            value={name}
            placeholder="Name of project"
            onChange={(event) =>
              setName(event.target.value)
            } />
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="totMeters" id="totMeters">
            <Form.Label>Total meters</Form.Label>
            <Form.Control type="number"
      id="totMeters"
      name="totMeters"
      value={totMeters}
      placeholder="Set total meters"
      onChange={(event) => {
        setMeters(event.target.value);
      }} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
)}
