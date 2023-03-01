import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useParams, useNavigate } from "react-router-dom";

export default function Settings() {
    const { user } = useAuth0();
    let email = user.email;
    const navigate = useNavigate();
    const [nickname, setNickname] = useState([]); 

    async function onSubmit(e){
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/user/${email}`);
        const user = await response.json();

        const edited_user = { 
            nickname: nickname
        };

        await fetch(`http://localhost:5000/settings/nickname/${user._id}`, {
          method: "POST",
          body: JSON.stringify(edited_user),
          headers: {
            "Content-Type": "application/json",
          },
        })
        .catch(error => {
          window.alert(error);
          return;
        });
        window.alert("Nickname have succesfully been changed.")
        navigate("/");
  
    }
    return (
        <div class="row justify-content-center align-items-center">
          <h1>Settings</h1>
        <Form onSubmit={onSubmit}  style={{width: '18rem'}}>
              <Form.Group className="mb-3" controlId="nickname" id="nickname">
              <br/><Form.Label>Change nickname</Form.Label>
                <Form.Control  type="text"
                id="nickname"
                name="new_nickname"
                value={nickname}
                placeholder="New nickname"
                onChange={(event) =>
                  setNickname(event.target.value)
                } />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
        </div>
        
      );
  

}