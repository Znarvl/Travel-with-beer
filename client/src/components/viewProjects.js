import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Card, Row, Col, Container} from "react-bootstrap";
import { Link } from "react-router-dom";



 
export default function ViewProjects() {
    const { user, loginWithRedirect, isAuthenticated } = useAuth0();
    let email = user;
    const [projects, setProjects] = useState([]);
      
    useEffect(() => {
        async function getProjects() {
            const response = await fetch(`http://localhost:5000/projects/${email.name}`);
            if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
            }
        
            const projects = await response.json();
            setProjects(projects);
        }
        getProjects();
        return;
    }, [projects.length]);


    
    if (!isAuthenticated){return(
        <div className="text-center">
            <h2>Please login or signup with Auth0</h2>
            <Button variant="primary" size="lg" onClick={loginWithRedirect}>Auth0</Button>
        </div>
    )
    }   
        return (
            <div><h1>Projects</h1>
        <Container>
            <Row>
                {projects.map((project, k) => (
                    <Col key={k} xs={12} md={4} lg={3}>
                        <Card >
                            <Card.Img src="https://via.placeholder.com/150x75" />
                            <Card.Body>
                                <Card.Title>Project name: {project.name}</Card.Title>
                                <Card.Text>Total meters: {Number(project.totMeters).toFixed(2)}</Card.Text>
                                <Card.Text>Progress: {Number(project.meters).toFixed(2)}</Card.Text>
                                <Link to={'project/' + project._id} className="btn btn-info">To project</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
           </div>
)}
