import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";



 
import "bootstrap/dist/css/bootstrap.css";
import { useParams } from "react-router-dom";

const Profile = (props) => (
    <div>
        <br/>
        <div class="row justify-content-center align-items-center">
        <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>User Profile</Card.Title>
                Nickname: {props.nickname}
                <br/>Email: {props.email}
                <br/>Cans: {props.cans}
                <br/>Bottles: {props.bottles}
                <br/>Meters: {props.meters}
        </Card.Body>
        </Card>
        </div>
        <br/>
        <div class="row justify-content-center align-items-center">
        <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>Projects</Card.Title>
                {props.project}
        </Card.Body>
        </Card>
        </div>

    </div>
    );

export default function Profiles() {
    const [profiles, setProfile] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        async function getProfiles() {
            const response = await fetch(`http://localhost:5000/profileId/${id}`);
            if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
            }
        
            const profiles = await response.json();
            setProfile(profiles);
        }
        getProfiles();
        return;
    }, [profiles.length]);

    function profileList() {
        return profiles.map((profile) => {
            <h1>${profile.name}s profile</h1>
            return (
            <Profile
            email={profile.email}
            nickname = {profile.nickname}
            cans = {profile.cans}
            bottles = {profile.bottles}
            meters = {profile.meters}
            project = {profile.project.map((project) => (
                <div>{project}</div>
              ))}
            key={profile._id}
            />
            );
        });
        }

    return (
        <div>
        {profileList()}
        </div>
    );
}