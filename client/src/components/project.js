import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Card, Row, Col, Container} from "react-bootstrap";
import { useParams } from "react-router-dom";
import io from "socket.io-client";// "socket.io-client/dist/socket.io"

import ChatContent from "./chat/chatContent";
import "./chat/chat.css"
const END_POINT = "http://localhost:5000";

let socket = io(END_POINT, {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});
//let socket;
 
export default function Project() {
    const { user, loginWithRedirect, isAuthenticated } = useAuth0();
    const { id } = useParams();
    const email = user.email;
    let emailAuth = user;
    const [project, setProject] = useState([]);
    
    //chat------------
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [message, setMessage] = useState(""); 
    const [messages, setMessages] = useState([]);
    const [inChat, setInChat] = useState(0);
    //---------------
	    const [emailRemove, setEmailRemove] = useState()
    const [emailAdd, setEmailAdd] = useState();
    
    /*
    useEffect(() => {
      console.log("got here")
      isAddedtoChat = true;
      return;
    }, [joinChat]);
    */
    async function getProject() {
      const response = await fetch(`http://localhost:5000/projects/project/${id}`); 
      if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
      }
      const project = await response.json();
      setProject(project);
    }

    async function onSubmitRemoveUser(e){
      getProject();
      e.preventDefault();
      project.map((userInList) =>{
        console.log(emailRemove)
        console.log(userInList.userList)
        let isUserInList = userInList.userList.includes(emailRemove)
        console.log(isUserInList)
        if (isUserInList){
           fetch(`http://localhost:5000/project/remove/${id}`, {
            method: "POST",
            body: JSON.stringify({email: emailRemove}),
            headers: {
              'Content-Type': 'application/json'
            },
          });     

        } else{
          window.alert("User is not in project");
        }

      }

      
      )
      getProject();
    }

    function containsObject(obj, list) {
      var i;
      for (i = 0; i < list.length; i++) {
          if (list[i].email === obj) {
              return true;
          }
      }
  
      return false;
  }
    async function onSubmitAddUser(e){
      e.preventDefault();
      getProject();
      project.map((userInDict) => {
      let isuserInDict = containsObject(emailAdd,userInDict.users)
      if (isuserInDict) {
        fetch(`http://localhost:5000/project/add/oldUser/${id}`, {
          method: "POST",
          body: JSON.stringify({email: emailAdd}),
          headers: {
            'Content-Type': 'application/json'
          },
        }); 

      } else{
         fetch(`http://localhost:5000/project/add/${id}`, {
              method: "POST",
              body: JSON.stringify({email: emailAdd}),
              headers: {
                'Content-Type': 'application/json'
              },
            }); 

      }
      }
      
      )
      getProject();

      // Get added users ID 
      e.preventDefault();
      const response = await fetch(`http://localhost:5000/user/${emailAdd}`);
      const new_project_user = await response.json();

      const user_project = { 
          project: project[0].name
      };

      // Add project to user
      await fetch(`http://localhost:5000/user/project/add/${new_project_user._id}`, {
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
    }

    function submitCans(e){
      getProject();
      project.map((users) =>
        users.userList.forEach(function(user) {
          if (user === emailAuth.email) {
            e.preventDefault();
            onSubmitProjectCans()
            onSubmitProjectUserCans()
            onSubmitProfileCans()

            
            getProject();
          }
          else{
            console.log("Not in list")
          }
        }
        
        )
      )

    }

    function submitBottles(e){
      getProject();
      project.map((users) =>
        users.userList.forEach(function(user) {
          if (user === emailAuth.email) {
            e.preventDefault();
            onSubmitProjectBottles()
            onSubmitProjectUserBottles()
            onSubmitProfileBottles()

            
            getProject();
          }
          else{
            console.log("Not in list")
          }
        }
        
        )
      )

    }
    
    async function onSubmitProjectCans() {      
        await fetch(`http://localhost:5000/cans/project/add/${id}`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          }, 
        });      
      }
      async function onSubmitProjectBottles() {      
        await fetch(`http://localhost:5000/bottles/project/add/${id}`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          }, 
        });      
      }
      async function onSubmitProfileCans() {      
        await fetch(`http://localhost:5000/cans/user/add`, {
          method: "POST",
          body: JSON.stringify({email: emailAuth.email}),
          headers: {
            'Content-Type': 'application/json'
          },
        });      
      }
      async function onSubmitProfileBottles() {      
        await fetch(`http://localhost:5000/bottles/user/add`, {
          method: "POST",
          body: JSON.stringify({email: emailAuth.email}),
          headers: {
            'Content-Type': 'application/json'
          },
        });      
      }
      async function onSubmitProjectUserCans() {      
        await fetch(`http://localhost:5000/cans/project/user/${id}`, {
          method: "POST",
          body: JSON.stringify({email: emailAuth.email}),
          headers: {
            'Content-Type': 'application/json'
          },
        });      
      }

      async function onSubmitProjectUserBottles() {      
        await fetch(`http://localhost:5000/bottles/project/user/${id}`, {
          method: "POST",
          body: JSON.stringify({email: emailAuth.email}),
          headers: {
            'Content-Type': 'application/json'
          },
        });      
      }

    useEffect(() => {
        getProject();
        return;
    }, [project.length]);

    //från: https://javascript.plainenglish.io/build-your-own-realtime-chat-app-with-mern-stack-f203af2e066e
    //kod från: https://github.com/XenoverseUp/chatter
    //chat -----------------------------
	useEffect(() => {
		socket = io(END_POINT); 
    console.log("ID:" + id);
		setName(emailAuth.email.toString());
		setRoom(id.toString()); 

		socket.emit("join", { name, room });

		return () => {
			socket.disconnect();  
      socket.off();
		}; 
	},[inChat]);

	useEffect(() => {
		socket.on("message", message => {
			setMessages(messages => [...messages, message]);
		});
	}, [inChat]);

	//send message function

	const sendMessage = event => {
		event.preventDefault();
        
		if (message) {
			socket.emit("sendMessage", message);
			setMessage("");
		}
	};

    function handleChat() {  
        return( 
        <div className="main-chat-container">
            <div className="chat-container">
                
                <ChatContent 
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                    messages={messages}
                    name={name}
                />
            </div>
        </div>
    );
    // Kod från  https://github.com/XenoverseUp/chatter slutar här-------------------------------------------------------

    }

    const projectInformation = project.map((information) =>
        <h1>{information.name} <br></br>
            Cans: {information.cans} <br></br>
            Bottles: {information.bottles} <br></br>
            Total meters: {Number(information.totMeters).toFixed(2)} <br></br>
            Goal meters: {Number(information.meters).toFixed(2)}
        </h1>
    )

    const projectLeaderboard = project.map((information) =>
    information.users.map(user =>

      <Card style={{width: '18rem'}}>
      <Card.Body>
          <Card.Title>Email: {user.email}</Card.Title>
          <Card.Text>Total cans: {user.cans}</Card.Text>
          <Card.Text>Total bottles: {user.bottles}</Card.Text>
          <Card.Text>Total meters: {Number(user.meters).toFixed(2)}</Card.Text>
      </Card.Body>
  </Card>
      )
)


    function adminControl(){
    if (project[0] != null){
      if(emailAuth.email === project[0].admin){
        return(           
        <div>
        <h3>Add user:</h3>
            <form onSubmit={onSubmitAddUser}>
                <input
                type="text"
                id="emailAdd"
                name="emaiAdd"
                value={emailAdd}
                placeholder="Enter email"
                onChange={(event) => {
                    setEmailAdd(event.target.value);
                  }}
                />
            <button type="submit">Submit</button>
            </form>
        <h3>Remove user:</h3>
            <form onSubmit={onSubmitRemoveUser}>
                <input
                type="text"
                id="emailRemove"
                value={emailRemove}
                name="emailRemove"
                placeholder="Enter email"
                onChange={(event) => {
                    setEmailRemove(event.target.value);
                  }}
                />
            <button type="submit">Submit</button>
            </form>
        </div>
        );
    } 
  }
  }
    if (!isAuthenticated){return(
        <div className="text-center">
            <h2>Please login or signup with Auth0</h2>
            <Button variant="primary" size="lg" onClick={loginWithRedirect}>Auth0</Button>
        </div>
    )
    }
        return (
            <div>
              <Container>
                <Row>
                  <Col>
                <h1>{projectInformation}</h1>
                
                <div>
                  <h2>Project members</h2>
                  {projectLeaderboard}
                </div>
                <Button onClick={submitCans}>Add can</Button>
                <Button onClick={submitBottles}>Add bottle</Button>
                <div>{adminControl()}</div>
                </Col>
                <Col>
                <div>
                  {handleChat()}
                  <br></br>
                  <Button onClick={() => setInChat(inChat + 1)}>Join chat</Button>
                </div>
                </Col>
                </Row>
                </Container>
           </div>
)}
